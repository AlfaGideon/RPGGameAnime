package com.rpggameanime.prototype;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
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
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Thin Android shell for the offline UI prototype and optional GitHub build checks. */
public final class MainActivity extends Activity {
    private static final String BUILD_MANIFEST_API =
            "https://api.github.com/repos/AlfaGideon/RPGGameAnime/contents/apk-output/version.json?ref=arena%2Ff45db89b-rpggameanime";
    private static final String RELEASES_API =
            "https://api.github.com/repos/AlfaGideon/RPGGameAnime/releases/latest";
    private static final String RELEASES_PAGE =
            "https://github.com/AlfaGideon/RPGGameAnime/releases";
    private static final String APK_RAW_URL =
            "https://raw.githubusercontent.com/AlfaGideon/RPGGameAnime/arena/f45db89b-rpggameanime/apk-output/Echo-Astra-UI-Prototype.apk";
    private static final String APK_RAW_PATH =
            "/AlfaGideon/RPGGameAnime/arena/f45db89b-rpggameanime/apk-output/Echo-Astra-UI-Prototype.apk";

    private WebView webView;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final ExecutorService networkExecutor = Executors.newSingleThreadExecutor();

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
        boolean isReleasePage = "github.com".equals(host)
                && path.startsWith("/AlfaGideon/RPGGameAnime/releases");
        boolean isBuildApk = "raw.githubusercontent.com".equals(host)
                && APK_RAW_PATH.equals(path);
        return isReleasePage || isBuildApk;
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
            result.put("apk_url", manifest.optString("apkUrl", APK_RAW_URL));
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
            result.put("status", "ok");
            result.put("tag_name", tagName);
            result.put("version_name", tagName.replaceFirst("(?i)^v", ""));
            result.put("html_url", release.optString("html_url", RELEASES_PAGE));
            JSONArray assets = release.optJSONArray("assets");
            if (assets != null) {
                for (int index = 0; index < assets.length(); index++) {
                    JSONObject asset = assets.optJSONObject(index);
                    if (asset == null) continue;
                    String name = asset.optString("name", "").toLowerCase(Locale.ROOT);
                    if (name.endsWith(".apk")) {
                        result.put("apk_url", asset.optString("browser_download_url", ""));
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
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
