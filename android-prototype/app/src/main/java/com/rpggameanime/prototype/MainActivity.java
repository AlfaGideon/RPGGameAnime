package com.rpggameanime.prototype;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageInstaller;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.util.Base64;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.HttpsURLConnection;

/** Thin Android shell for the offline UI prototype and optional GitHub build checks. */
public final class MainActivity extends Activity {
    private static final String BUILD_MANIFEST_API =
            "https://api.github.com/repos/AlfaGideon/RPGGameAnime/contents/apk-output/version.json?ref=arena%2Fbe2b6726-rpggameanime";
    private static final String RELEASES_API =
            "https://api.github.com/repos/AlfaGideon/RPGGameAnime/releases/latest";
    private static final String RELEASES_PAGE =
            "https://github.com/AlfaGideon/RPGGameAnime/releases";
    private static final String LATEST_APK_URL =
            "https://github.com/AlfaGideon/RPGGameAnime/releases/latest/download/Echo-Astra-UI-Prototype.apk";
    private static final String INSTALL_STATUS_ACTION =
            "com.rpggameanime.prototype.UPDATE_INSTALL_STATUS";
    private static final int REQUEST_UNKNOWN_APP_SOURCES = 7614;
    private static final int MAX_DOWNLOAD_REDIRECTS = 5;
    private static final long MAX_APK_BYTES = 150L * 1024L * 1024L;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService networkExecutor = Executors.newSingleThreadExecutor();
    private final AtomicBoolean apkDownloadActive = new AtomicBoolean(false);
    private WebView webView;
    private File pendingInstallFile;
    private boolean installStatusReceiverRegistered;

    private final BroadcastReceiver installStatusReceiver = new BroadcastReceiver() {
        @Override
        @SuppressWarnings("deprecation")
        public void onReceive(Context context, Intent intent) {
            int status = intent.getIntExtra(PackageInstaller.EXTRA_STATUS, PackageInstaller.STATUS_FAILURE);
            String statusMessage = intent.getStringExtra(PackageInstaller.EXTRA_STATUS_MESSAGE);
            if (status == PackageInstaller.STATUS_PENDING_USER_ACTION) {
                Intent confirmation = intent.getParcelableExtra(Intent.EXTRA_INTENT);
                if (confirmation != null) {
                    confirmation.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    try {
                        startActivity(confirmation);
                        publishDownloadStatus("installing", "Подтверди установку в системном окне Android.", 100);
                    } catch (Exception exception) {
                        publishDownloadStatus("error", "Android не смог открыть системное подтверждение установки.", 100);
                    }
                } else {
                    publishDownloadStatus("installing", "Открой системное подтверждение установки Android.", 100);
                }
            } else if (status == PackageInstaller.STATUS_SUCCESS) {
                publishDownloadStatus("success", "Обновление установлено. Если приложение не перезапустилось, открой его ещё раз.", 100);
            } else if (status == PackageInstaller.STATUS_FAILURE_INCOMPATIBLE
                    || status == PackageInstaller.STATUS_FAILURE_CONFLICT) {
                publishDownloadStatus("signature-mismatch",
                        "Android отклонил APK из-за несовпадающей подписи. Для старой сборки нужна однократная переустановка.", 100);
            } else {
                String message = statusMessage == null || statusMessage.trim().isEmpty()
                        ? "Системный установщик Android отклонил пакет (код " + status + ")."
                        : "Системный установщик Android отклонил пакет: " + statusMessage;
                publishDownloadStatus("error", message, 100);
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        window.setStatusBarColor(Color.rgb(16, 24, 39));
        window.setNavigationBarColor(Color.rgb(15, 23, 37));
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        window.getDecorView().setSystemUiVisibility(0);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(16, 24, 39));
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleNavigation(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleNavigation(Uri.parse(url));
            }
        });

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setTextZoom(100);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        webView.addJavascriptInterface(new GithubUpdatesBridge(), "EchoAstraAndroid");

        IntentFilter installStatusFilter = new IntentFilter(INSTALL_STATUS_ACTION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(installStatusReceiver, installStatusFilter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(installStatusReceiver, installStatusFilter);
        }
        installStatusReceiverRegistered = true;

        setContentView(webView);
        webView.loadUrl("file:///android_asset/index.html");
    }

    private boolean handleNavigation(Uri uri) {
        String path = uri.getPath();
        if ("file".equals(uri.getScheme()) && path != null && path.startsWith("/android_asset/")) return false;
        if (isTrustedUpdateUri(uri)) {
            try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
            catch (Exception ignored) { }
        }
        return true;
    }

    private boolean isTrustedUpdateUri(Uri uri) {
        if (!"https".equals(uri.getScheme())) return false;
        String host = uri.getHost();
        String path = uri.getPath();
        if (host == null || path == null) return false;
        return "github.com".equals(host)
                && path.startsWith("/AlfaGideon/RPGGameAnime/releases");
    }

    private boolean isTrustedApkUri(Uri uri) {
        if (!"https".equals(uri.getScheme()) || !"github.com".equals(uri.getHost())) return false;
        String path = uri.getPath();
        return path != null && (path.startsWith("/AlfaGideon/RPGGameAnime/releases/download/")
                || path.startsWith("/AlfaGideon/RPGGameAnime/releases/latest/download/"));
    }

    private boolean isAllowedDownloadHost(URL url) {
        if (!"https".equalsIgnoreCase(url.getProtocol())) return false;
        String host = url.getHost().toLowerCase(Locale.ROOT);
        return "github.com".equals(host)
                || "release-assets.githubusercontent.com".equals(host)
                || "github-releases.githubusercontent.com".equals(host)
                || "objects.githubusercontent.com".equals(host);
    }

    public final class GithubUpdatesBridge {
        @JavascriptInterface
        public String getInstalledVersionName() {
            try {
                PackageInfo packageInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
                return packageInfo.versionName == null ? "0.1.0" : packageInfo.versionName;
            } catch (Exception ignored) {
                return "0.1.0";
            }
        }

        @JavascriptInterface
        public long getInstalledVersionCode() {
            try {
                PackageInfo packageInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) return packageInfo.getLongVersionCode();
                //noinspection deprecation
                return packageInfo.versionCode;
            } catch (Exception ignored) {
                return 1L;
            }
        }

        @JavascriptInterface
        public void checkLatestRelease() {
            networkExecutor.execute(() -> {
                JSONObject result;
                try {
                    result = fetchBuildManifestOrRelease();
                } catch (Exception exception) {
                    result = new JSONObject();
                    try {
                        result.put("status", "error");
                        result.put("message", exception.getClass().getSimpleName());
                    } catch (Exception ignored) {
                        // The callback only needs a small status object.
                    }
                }

                final String payload = result.toString();
                mainHandler.post(() -> {
                    if (webView != null) {
                        String callback = "window.onGitHubUpdatePayload && window.onGitHubUpdatePayload("
                                + JSONObject.quote(payload) + ")";
                        webView.evaluateJavascript(callback, null);
                    }
                });
            });
        }

        private JSONObject fetchBuildManifestOrRelease() throws Exception {
            JSONObject contentsFile = fetchJson(BUILD_MANIFEST_API);
            if ("not-found".equals(contentsFile.optString("status"))) return fetchLatestRelease();

            String content = contentsFile.optString("content", "").replaceAll("\\s", "");
            if (content.isEmpty()) throw new IllegalStateException("Empty build manifest");
            String encoding = contentsFile.optString("encoding", "base64");
            String jsonText = "base64".equalsIgnoreCase(encoding)
                    ? new String(Base64.decode(content, Base64.DEFAULT), StandardCharsets.UTF_8)
                    : content;
            JSONObject manifest = new JSONObject(jsonText);

            JSONObject result = new JSONObject();
            result.put("status", "ok");
            result.put("version_name", manifest.optString("versionName", ""));
            result.put("version_code", manifest.optLong("versionCode", 0L));
            result.put("tag_name", manifest.optString("tagName", ""));
            result.put("apk_url", manifest.optString("apkUrl", LATEST_APK_URL));
            result.put("html_url", manifest.optString("htmlUrl", RELEASES_PAGE));
            result.put("build_sha", manifest.optString("buildSha", ""));
            result.put("sha256", manifest.optString("sha256", ""));
            return result;
        }

        private JSONObject fetchLatestRelease() throws Exception {
            JSONObject release = fetchJson(RELEASES_API);
            if ("not-found".equals(release.optString("status"))) {
                JSONObject result = new JSONObject();
                result.put("status", "no-release");
                return result;
            }

            JSONObject result = new JSONObject();
            String tagName = release.optString("tag_name", "");
            String releaseBody = release.optString("body", "");
            result.put("status", "ok");
            result.put("tag_name", tagName);
            result.put("version_name", tagName.replaceFirst("(?i)^v", ""));
            result.put("html_url", release.optString("html_url", RELEASES_PAGE));
            Matcher versionCode = Pattern.compile("(?i)Version code\\s*:\\s*(\\d+)").matcher(releaseBody);
            result.put("version_code", versionCode.find() ? Long.parseLong(versionCode.group(1)) : 0L);
            JSONArray assets = release.optJSONArray("assets");
            if (assets != null) {
                for (int index = 0; index < assets.length(); index++) {
                    JSONObject asset = assets.optJSONObject(index);
                    if (asset == null) continue;
                    String name = asset.optString("name", "").toLowerCase(Locale.ROOT);
                    if (name.endsWith(".apk")) {
                        result.put("apk_url", asset.optString("browser_download_url", ""));
                        String sha256 = asset.optString("digest", "").replaceFirst("(?i)^sha256:", "");
                        if (!sha256.matches("(?i)[a-f0-9]{64}")) {
                            Matcher hash = Pattern.compile("(?i)SHA-256\\s*:\\s*([a-f0-9]{64})").matcher(releaseBody);
                            sha256 = hash.find() ? hash.group(1) : "";
                        }
                        result.put("sha256", sha256);
                        break;
                    }
                }
            }
            return result;
        }

        @JavascriptInterface
        public void openRelease(String url) {
            Uri updateUri = Uri.parse(url == null ? RELEASES_PAGE : url);
            if (!isTrustedUpdateUri(updateUri)) updateUri = Uri.parse(RELEASES_PAGE);

            final Uri targetUri = updateUri;
            mainHandler.post(() -> {
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, targetUri));
                } catch (Exception ignored) {
                    // The UI remains usable if the device has no browser or installer available.
                }
            });
        }

        @JavascriptInterface
        public void downloadAndInstallApk(String apkUrl, String expectedSha256,
                                          String expectedVersionName, long expectedVersionCode) {
            Uri sourceUri = Uri.parse(apkUrl == null ? "" : apkUrl);
            String normalizedSha = normalizeSha256(expectedSha256);
            if (!isTrustedApkUri(sourceUri)) {
                publishDownloadStatus("error", "Ссылка на APK не относится к официальному GitHub-релизу проекта.", 0);
                return;
            }
            if (normalizedSha == null) {
                publishDownloadStatus("error", "В манифесте отсутствует корректный SHA-256. Непроверенный APK скачиваться не будет.", 0);
                return;
            }
            if (expectedVersionCode <= 0) {
                publishDownloadStatus("error", "В манифесте отсутствует корректный код версии APK.", 0);
                return;
            }
            if (!apkDownloadActive.compareAndSet(false, true)) {
                publishDownloadStatus("downloading", "Загрузка APK уже выполняется.", 0);
                return;
            }

            publishDownloadStatus("starting", "Подготавливаем безопасную загрузку…", 0);
            networkExecutor.execute(() -> {
                File downloadedFile = null;
                try {
                    downloadedFile = downloadApk(apkUrl, normalizedSha, expectedVersionCode);
                    publishDownloadStatus("verifying", "Проверяем SHA-256, пакет, версию и подпись APK…", 100);
                    verifyDownloadedApk(downloadedFile, expectedVersionName, expectedVersionCode);
                    File verifiedFile = downloadedFile;
                    mainHandler.post(() -> beginInstallOrRequestPermission(verifiedFile));
                } catch (UpdateException exception) {
                    if (downloadedFile != null) downloadedFile.delete();
                    publishDownloadStatus(exception.status, exception.getMessage(), 0);
                } catch (Exception exception) {
                    if (downloadedFile != null) downloadedFile.delete();
                    publishDownloadStatus("error", userFacingDownloadError(exception), 0);
                } finally {
                    apkDownloadActive.set(false);
                }
            });
        }
    }

    private File downloadApk(String sourceUrl, String expectedSha256, long versionCode) throws Exception {
        File updateDirectory = new File(getCacheDir(), "updates");
        if (!updateDirectory.isDirectory() && !updateDirectory.mkdirs()) {
            throw new IllegalStateException("Не удалось создать временную папку для APK.");
        }
        File temporaryFile = new File(updateDirectory, "echo-astra-" + versionCode + ".apk.part");
        File apkFile = new File(updateDirectory, "echo-astra-" + versionCode + ".apk");
        if (temporaryFile.exists()) temporaryFile.delete();
        if (apkFile.exists()) apkFile.delete();

        HttpsURLConnection connection = openTrustedDownloadConnection(sourceUrl);
        long contentLength = connection.getContentLengthLong();
        if (contentLength > MAX_APK_BYTES) {
            connection.disconnect();
            throw new IllegalStateException("Размер APK превышает допустимый лимит.");
        }
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        long bytesRead = 0L;
        int lastProgress = -1;
        try (InputStream input = connection.getInputStream();
             FileOutputStream output = new FileOutputStream(temporaryFile)) {
            byte[] buffer = new byte[32 * 1024];
            int count;
            while ((count = input.read(buffer)) != -1) {
                output.write(buffer, 0, count);
                digest.update(buffer, 0, count);
                bytesRead += count;
                if (bytesRead > MAX_APK_BYTES) throw new IllegalStateException("Размер APK превышает допустимый лимит.");
                int progress = contentLength > 0
                        ? (int) Math.min(99L, bytesRead * 100L / contentLength)
                        : 0;
                if (progress != lastProgress && (progress == 0 || progress == 99 || progress / 5 != lastProgress / 5)) {
                    lastProgress = progress;
                    publishDownloadStatus("downloading", "Скачиваем APK…", progress);
                }
            }
            output.getFD().sync();
        } catch (Exception exception) {
            temporaryFile.delete();
            throw exception;
        } finally {
            connection.disconnect();
        }

        String downloadedSha256 = toHex(digest.digest());
        if (!expectedSha256.equals(downloadedSha256)) {
            temporaryFile.delete();
            throw new UpdateException("error", "SHA-256 скачанного APK не совпадает с манифестом. Установка отменена.");
        }
        if (!temporaryFile.renameTo(apkFile)) {
            temporaryFile.delete();
            throw new IllegalStateException("Не удалось сохранить скачанный APK во временной папке.");
        }
        return apkFile;
    }

    private HttpsURLConnection openTrustedDownloadConnection(String sourceUrl) throws Exception {
        URL current = new URL(sourceUrl);
        for (int redirects = 0; redirects <= MAX_DOWNLOAD_REDIRECTS; redirects++) {
            if (!isAllowedDownloadHost(current)) {
                throw new IllegalStateException("Ссылка перенаправила APK на недоверенный сервер.");
            }
            HttpsURLConnection connection = (HttpsURLConnection) current.openConnection();
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/vnd.android.package-archive, application/octet-stream");
            connection.setRequestProperty("User-Agent", "Echo-Astra-Android-Prototype");
            connection.setConnectTimeout(15000);
            connection.setReadTimeout(60000);
            int responseCode = connection.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) return connection;
            if (responseCode >= 300 && responseCode < 400) {
                String location = connection.getHeaderField("Location");
                connection.disconnect();
                if (location == null || location.trim().isEmpty()) {
                    throw new IllegalStateException("Сервер вернул пустую ссылку перенаправления.");
                }
                current = new URL(current, location);
                continue;
            }
            connection.disconnect();
            throw new IllegalStateException("GitHub вернул HTTP " + responseCode + " при скачивании APK.");
        }
        throw new IllegalStateException("Слишком много перенаправлений при скачивании APK.");
    }

    private void verifyDownloadedApk(File apkFile, String expectedVersionName,
                                     long expectedVersionCode) throws Exception {
        PackageManager packageManager = getPackageManager();
        int packageFlags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
                ? PackageManager.GET_SIGNING_CERTIFICATES
                : PackageManager.GET_SIGNATURES;
        PackageInfo candidate = packageManager.getPackageArchiveInfo(apkFile.getAbsolutePath(), packageFlags);
        if (candidate == null || candidate.packageName == null) {
            throw new UpdateException("error", "Скачанный файл не распознан как APK-пакет Android.");
        }
        if (!getPackageName().equals(candidate.packageName)) {
            throw new UpdateException("error", "Скачанный APK принадлежит другому приложению. Установка отменена.");
        }
        long candidateVersionCode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
                ? candidate.getLongVersionCode()
                : candidate.versionCode;
        if (candidateVersionCode != expectedVersionCode) {
            throw new UpdateException("error", "Код версии APK не совпадает с манифестом. Установка отменена.");
        }
        if (expectedVersionName != null && !expectedVersionName.trim().isEmpty()
                && candidate.versionName != null && !expectedVersionName.equals(candidate.versionName)) {
            throw new UpdateException("error", "Название версии APK не совпадает с манифестом. Установка отменена.");
        }

        PackageInfo installed = packageManager.getPackageInfo(getPackageName(), packageFlags);
        long installedVersionCode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
                ? installed.getLongVersionCode()
                : installed.versionCode;
        if (candidateVersionCode <= installedVersionCode) {
            throw new UpdateException("error", "Эта версия APK не новее установленной. Установка отменена.");
        }
        if (!hasSameSigningCertificates(installed, candidate)) {
            throw new UpdateException("signature-mismatch",
                    "APK подписан другим ключом. Android не разрешит обновить установленную сборку поверх. Для перехода со старой debug-сборки один раз удали её и установи новый APK; удаление сотрёт локальные данные. После миграции будущие обновления будут ставиться из приложения.");
        }
    }

    private boolean hasSameSigningCertificates(PackageInfo first, PackageInfo second) throws Exception {
        List<String> firstCertificates = signingCertificateFingerprints(first);
        List<String> secondCertificates = signingCertificateFingerprints(second);
        return !firstCertificates.isEmpty() && firstCertificates.equals(secondCertificates);
    }

    private List<String> signingCertificateFingerprints(PackageInfo packageInfo) throws Exception {
        Signature[] signatures;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
                && packageInfo.signingInfo != null) {
            signatures = packageInfo.signingInfo.getApkContentsSigners();
        } else {
            //noinspection deprecation
            signatures = packageInfo.signatures;
        }
        List<String> fingerprints = new ArrayList<>();
        if (signatures != null) {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            for (Signature signature : signatures) {
                if (signature != null) fingerprints.add(toHex(digest.digest(signature.toByteArray())));
            }
        }
        Collections.sort(fingerprints);
        return fingerprints;
    }

    private void beginInstallOrRequestPermission(File apkFile) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                && !getPackageManager().canRequestPackageInstalls()) {
            pendingInstallFile = apkFile;
            publishDownloadStatus("permission",
                    "Разреши приложению «Эхо Астры» устанавливать APK в системных настройках, затем вернись сюда.", 100);
            try {
                Intent settingsIntent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                        Uri.parse("package:" + getPackageName()));
                startActivityForResult(settingsIntent, REQUEST_UNKNOWN_APP_SOURCES);
            } catch (Exception exception) {
                pendingInstallFile = null;
                publishDownloadStatus("error", "Не удалось открыть настройку разрешения на установку APK.", 100);
            }
            return;
        }
        installVerifiedApk(apkFile);
    }

    @Override
    @SuppressWarnings("deprecation")
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != REQUEST_UNKNOWN_APP_SOURCES) return;
        File apkFile = pendingInstallFile;
        pendingInstallFile = null;
        if (apkFile == null || !apkFile.isFile()) {
            publishDownloadStatus("error", "Скачанный APK больше недоступен. Запусти загрузку ещё раз.", 0);
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                && !getPackageManager().canRequestPackageInstalls()) {
            publishDownloadStatus("error", "Разрешение не выдано. APK не был установлен.", 100);
            return;
        }
        installVerifiedApk(apkFile);
    }

    private void installVerifiedApk(File apkFile) {
        PackageInstaller installer = getPackageManager().getPackageInstaller();
        PackageInstaller.Session session = null;
        int sessionId = -1;
        try {
            PackageInstaller.SessionParams params = new PackageInstaller.SessionParams(
                    PackageInstaller.SessionParams.MODE_FULL_INSTALL);
            params.setAppPackageName(getPackageName());
            params.setSize(apkFile.length());
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                params.setRequireUserAction(PackageInstaller.SessionParams.USER_ACTION_REQUIRED);
            }
            sessionId = installer.createSession(params);
            session = installer.openSession(sessionId);
            try (FileInputStream input = new FileInputStream(apkFile);
                 OutputStream output = session.openWrite("base.apk", 0, apkFile.length())) {
                byte[] buffer = new byte[32 * 1024];
                int count;
                while ((count = input.read(buffer)) != -1) output.write(buffer, 0, count);
                session.fsync(output);
            }

            Intent statusIntent = new Intent(INSTALL_STATUS_ACTION).setPackage(getPackageName());
            int pendingIntentFlags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) pendingIntentFlags |= PendingIntent.FLAG_MUTABLE;
            PendingIntent statusReceiver = PendingIntent.getBroadcast(this, sessionId, statusIntent, pendingIntentFlags);
            session.commit(statusReceiver.getIntentSender());
            publishDownloadStatus("installing", "APK проверен. Подтверди установку в системном окне Android.", 100);
        } catch (Exception exception) {
            if (sessionId >= 0) {
                try { installer.abandonSession(sessionId); }
                catch (Exception ignored) { }
            }
            publishDownloadStatus("error", "Не удалось передать APK системному установщику Android.", 100);
        } finally {
            if (session != null) {
                try { session.close(); }
                catch (Exception ignored) { }
            }
        }
    }

    private void publishDownloadStatus(String status, String message, int progress) {
        JSONObject payload = new JSONObject();
        try {
            payload.put("status", status);
            payload.put("message", message == null ? "" : message);
            payload.put("progress", Math.max(0, Math.min(100, progress)));
        } catch (Exception ignored) {
            // All values are local strings and integers; the empty fallback is still safe for the UI.
        }
        String json = payload.toString();
        mainHandler.post(() -> {
            if (webView == null) return;
            String callback = "window.onAndroidUpdateDownloadStatus && window.onAndroidUpdateDownloadStatus("
                    + JSONObject.quote(json) + ")";
            webView.evaluateJavascript(callback, null);
        });
    }

    private String normalizeSha256(String value) {
        if (value == null) return null;
        String normalized = value.trim().replaceFirst("(?i)^sha256:", "").toLowerCase(Locale.ROOT);
        return normalized.matches("[a-f0-9]{64}") ? normalized : null;
    }

    private String toHex(byte[] bytes) {
        StringBuilder output = new StringBuilder(bytes.length * 2);
        for (byte value : bytes) output.append(String.format(Locale.ROOT, "%02x", value & 0xff));
        return output.toString();
    }

    private String userFacingDownloadError(Exception exception) {
        String message = exception.getMessage();
        if (message != null && (message.contains("HTTP") || message.contains("connect")
                || message.contains("timed out") || message.contains("Unable to resolve"))) {
            return "Не удалось скачать APK с GitHub. Проверь подключение и попробуй ещё раз.";
        }
        return message == null || message.trim().isEmpty()
                ? "Не удалось скачать или проверить APK. Попробуй ещё раз."
                : message;
    }

    private static final class UpdateException extends Exception {
        final String status;

        UpdateException(String status, String message) {
            super(message);
            this.status = status;
        }
    }

    private JSONObject fetchJson(String requestUrl) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(requestUrl).openConnection();
        try {
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/vnd.github+json");
            connection.setRequestProperty("X-GitHub-Api-Version", "2022-11-28");
            connection.setRequestProperty("Cache-Control", "no-cache");
            connection.setRequestProperty("User-Agent", "Echo-Astra-Android-Prototype");
            connection.setConnectTimeout(8000);
            connection.setReadTimeout(8000);

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_NOT_FOUND) {
                JSONObject notFound = new JSONObject();
                notFound.put("status", "not-found");
                return notFound;
            }
            if (responseCode < 200 || responseCode >= 300) {
                throw new IllegalStateException("GitHub HTTP " + responseCode);
            }
            return new JSONObject(readResponse(connection.getInputStream()));
        } finally {
            connection.disconnect();
        }
    }

    private String readResponse(InputStream input) throws Exception {
        try (InputStream source = input; ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096];
            int count;
            while ((count = source.read(buffer)) != -1) output.write(buffer, 0, count);
            return new String(output.toByteArray(), StandardCharsets.UTF_8);
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        networkExecutor.shutdownNow();
        if (installStatusReceiverRegistered) {
            try { unregisterReceiver(installStatusReceiver); }
            catch (Exception ignored) { }
            installStatusReceiverRegistered = false;
        }
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
