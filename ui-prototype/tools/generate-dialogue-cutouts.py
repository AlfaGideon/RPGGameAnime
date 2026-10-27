#!/usr/bin/env python3
"""Batch-cut dialogue sprites from the existing full-background illustrations.

Uses rembg's pretrained U2NETP foreground-removal model. Meyra's source art contains a
large, highly salient floating city, so that one sprite is additionally constrained by a
second pretrained human-segmentation mask. No character art is generated or redrawn; the
original full-background illustrations remain untouched.

Install once:
    python3 -m pip install -r ui-prototype/tools/requirements-cutouts.txt
Run:
    python3 ui-prototype/tools/generate-dialogue-cutouts.py
Models are cached outside the repository under ~/.u2net (or U2NET_HOME).
"""
from __future__ import annotations

import argparse
import hashlib
import os
import shutil
import tempfile
import urllib.request
import zipfile
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
U2NETP_ARCHIVE_URL = (
    "https://codeload.github.com/debuggity/u2netp_bg_removal_example/zip/refs/heads/main"
)
U2NETP_ARCHIVE_MEMBER = "u2netp.onnx"
U2NETP_SHA256 = "309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8"
HUMAN_MODEL_URL = (
    "https://api.github.com/repos/tapos-datta/HumanSegmentation/contents/"
    "pre-trained_model/u2netp_human_matting_onnx_opset_11.onnx?ref=main"
)
HUMAN_MODEL_SHA256 = "e0fc9d1ad74267f79d4725b2f1982f31a2128a45ffa3e008e0e322e290870b90"


@dataclass(frozen=True)
class Sprite:
    source: str
    output: str
    mirror_horizontal: bool = False
    constrain_to_person: bool = False


SPRITES = (
    Sprite("npcs/iara-kest.png", "cutouts/npcs/iara-kest.png", mirror_horizontal=True),
    Sprite("npcs/vesta-ran.png", "cutouts/npcs/vesta-ran.png"),
    Sprite("npcs/nir.png", "cutouts/npcs/nir.png"),
    Sprite("npcs/toren-val.png", "cutouts/npcs/toren-val.png"),
    Sprite("npcs/meyra-sol.png", "cutouts/npcs/meyra-sol.png", constrain_to_person=True),
    Sprite("npcs/elna-rut.png", "cutouts/npcs/elna-rut.png"),
    Sprite("npcs/kora-vei.png", "cutouts/npcs/kora-vei.png", mirror_horizontal=True),
    Sprite("classes/arcanist.png", "cutouts/classes/arcanist.png"),
    Sprite("classes/duelist.png", "cutouts/classes/duelist.png"),
    Sprite("classes/guardian.png", "cutouts/classes/guardian.png"),
    Sprite("classes/ranger.png", "cutouts/classes/ranger.png"),
    Sprite("classes/warden.png", "cutouts/classes/warden.png"),
)


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def verify_model(path: Path, expected_sha256: str) -> Path:
    actual = file_sha256(path)
    if actual != expected_sha256:
        path.unlink(missing_ok=True)
        raise RuntimeError(f"Model checksum mismatch for {path.name}: {actual}")
    return path


def ensure_u2netp_model(cache_dir: Path) -> Path:
    model_path = cache_dir / "u2netp.onnx"
    if model_path.is_file():
        return model_path

    cache_dir.mkdir(parents=True, exist_ok=True)
    print("Downloading U2NETP from GitHub codeload…", flush=True)
    with tempfile.TemporaryDirectory(prefix="echo-astra-u2netp-") as temporary:
        archive_path = Path(temporary) / "u2netp.zip"
        request = urllib.request.Request(
            U2NETP_ARCHIVE_URL,
            headers={"User-Agent": "EchoAstra-dialogue-cutout-tool"},
        )
        with urllib.request.urlopen(request, timeout=90) as response, archive_path.open("wb") as target:
            shutil.copyfileobj(response, target)

        with zipfile.ZipFile(archive_path) as archive:
            candidates = [
                name for name in archive.namelist()
                if name.endswith("/" + U2NETP_ARCHIVE_MEMBER)
            ]
            if len(candidates) != 1:
                raise RuntimeError("GitHub archive did not contain exactly one u2netp.onnx model")
            with archive.open(candidates[0]) as source, model_path.open("wb") as target:
                shutil.copyfileobj(source, target)

    return verify_model(model_path, U2NETP_SHA256)


def ensure_human_model(cache_dir: Path) -> Path:
    model_path = cache_dir / "human" / "u2netp.onnx"
    if model_path.is_file():
        return model_path

    model_path.parent.mkdir(parents=True, exist_ok=True)
    print("Downloading the human-segmentation model from GitHub API…", flush=True)
    request = urllib.request.Request(
        HUMAN_MODEL_URL,
        headers={
            "Accept": "application/vnd.github.raw",
            "User-Agent": "EchoAstra-dialogue-cutout-tool",
        },
    )
    temporary_path = model_path.with_suffix(".download")
    with urllib.request.urlopen(request, timeout=90) as response, temporary_path.open("wb") as target:
        shutil.copyfileobj(response, target)
    temporary_path.replace(model_path)
    return verify_model(model_path, HUMAN_MODEL_SHA256)


def human_person_region(alpha_image: object):
    """Return the largest human-mask component, filled and slightly dilated for clean edges."""
    import numpy as np
    from scipy import ndimage

    alpha = np.asarray(alpha_image, dtype=np.uint8)
    labels, _ = ndimage.label(alpha >= 60)
    counts = np.bincount(labels.ravel())
    if len(counts) <= 1 or counts[1:].max() == 0:
        raise RuntimeError("The human-segmentation model found no person")

    person = labels == (int(np.argmax(counts[1:])) + 1)
    person = ndimage.binary_closing(person, structure=np.ones((9, 9), dtype=bool))
    person = ndimage.binary_fill_holes(person)
    radius = 6
    yy, xx = np.ogrid[-radius:radius + 1, -radius:radius + 1]
    disk = (xx * xx + yy * yy) <= radius * radius
    return ndimage.binary_dilation(person, structure=disk)


def create_cutout(source: Path, output: Path, session: object, human_session: object | None,
                  sprite: Sprite) -> None:
    try:
        import numpy as np
        from PIL import Image, ImageFilter, ImageOps
        from rembg import remove
    except ImportError as exc:
        raise SystemExit(
            "Cutout dependencies are missing. Install them with: "
            "python3 -m pip install -r ui-prototype/tools/requirements-cutouts.txt"
        ) from exc

    with Image.open(source) as opened:
        image = opened.convert("RGBA")
    result = remove(image, session=session, post_process_mask=True)

    if sprite.constrain_to_person:
        if human_session is None:
            raise RuntimeError("Meyra requires the human-segmentation session")
        human_result = remove(image, session=human_session, post_process_mask=False)
        region = human_person_region(human_result.getchannel("A"))
        salient_alpha = np.asarray(result.getchannel("A"), dtype=np.uint8)
        human_alpha = np.asarray(human_result.getchannel("A"), dtype=np.uint8)
        combined_alpha = np.maximum(salient_alpha, human_alpha)
        combined_alpha[~region] = 0
        result.putalpha(Image.fromarray(combined_alpha).filter(ImageFilter.GaussianBlur(0.6)))

    alpha = result.getchannel("A")
    bounds = alpha.point(lambda value: 255 if value >= 12 else 0).getbbox()
    if bounds is None:
        raise RuntimeError(f"No foreground was detected in {source}")

    left, top, right, bottom = bounds
    padding = 3
    result = result.crop((
        max(0, left - padding),
        max(0, top - padding),
        min(result.width, right + padding),
        min(result.height, bottom + padding),
    ))
    if sprite.mirror_horizontal:
        result = ImageOps.mirror(result)

    output.parent.mkdir(parents=True, exist_ok=True)
    result.save(output, format="PNG", optimize=True)
    print(f"{source.relative_to(ROOT)} -> {output.relative_to(ROOT)} ({result.width}×{result.height})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", type=Path, help="use an existing u2netp.onnx model")
    parser.add_argument(
        "--only", nargs="+", metavar="NAME",
        help="process selected sprite names (for example: iara-kest ranger)",
    )
    args = parser.parse_args()

    selected = SPRITES
    if args.only:
        names = {name.lower() for name in args.only}
        selected = tuple(sprite for sprite in SPRITES if Path(sprite.source).stem in names)
        unknown = names - {Path(sprite.source).stem for sprite in selected}
        if unknown:
            parser.error("unknown sprite name(s): " + ", ".join(sorted(unknown)))

    cache_dir = Path(os.environ.get("U2NET_HOME", Path.home() / ".u2net")).expanduser()
    if args.model:
        model_path = args.model.resolve()
        if not model_path.is_file() or model_path.name != "u2netp.onnx":
            parser.error("--model must point to a file named u2netp.onnx")
        cache_dir = model_path.parent
    else:
        ensure_u2netp_model(cache_dir)

    try:
        from rembg import new_session
    except ImportError as exc:
        raise SystemExit(
            "Cutout dependencies are missing. Install them with: "
            "python3 -m pip install -r ui-prototype/tools/requirements-cutouts.txt"
        ) from exc

    os.environ["U2NET_HOME"] = str(cache_dir)
    session = new_session("u2netp")
    human_session = None
    if any(sprite.constrain_to_person for sprite in selected):
        ensure_human_model(cache_dir)
        os.environ["U2NET_HOME"] = str(cache_dir / "human")
        human_session = new_session("u2netp")
        os.environ["U2NET_HOME"] = str(cache_dir)

    for sprite in selected:
        source = ROOT / "assets" / sprite.source
        output = ROOT / "assets" / sprite.output
        if not source.is_file():
            raise SystemExit(f"Missing source illustration: {source}")
        create_cutout(source, output, session, human_session, sprite)


if __name__ == "__main__":
    main()
