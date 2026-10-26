package com.rpggameanime.prototype;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Thin Android shell for the offline UI prototype and optional GitHub release checks. */
public final class MainActivity extends Activity {
    private static final String RELEASES_API =
            "https://api.github.com/repos/AlfaGideon/RPGGameAnime/releases/latest";
    private static final String RELEASES_PAGE =
            "https://github.com/AlfaGideon/RPGGameAnime/releases";

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
        if ("https".equals(uri.getScheme()) && "github.com".equals(uri.getHost())
                && path != null && path.startsWith("/AlfaGideon/RPGGameAnime/releases")) {
            try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
            catch (Exception ignored) { }
        }
        return true;
    }

    public final class GithubUpdatesBridge {
        @JavascriptInterface
        public void checkLatestRelease() {
            networkExecutor.execute(() -> {
                JSONObject result = new JSONObject();
                HttpURLConnection connection = null;
                try {
                    connection = (HttpURLConnection) new URL(RELEASES_API).openConnection();
                    connection.setRequestMethod("GET");
                    connection.setRequestProperty("Accept", "application/vnd.github+json");
                    connection.setRequestProperty("X-GitHub-Api-Version", "2022-11-28");
                    connection.setRequestProperty("User-Agent", "Echo-Astra-Android-Prototype");
                    connection.setConnectTimeout(8000);
                    connection.setReadTimeout(8000);

                    int responseCode = connection.getResponseCode();
                    if (responseCode == HttpURLConnection.HTTP_NOT_FOUND) {
                        result.put("status", "no-release");
                    } else if (responseCode >= 200 && responseCode < 300) {
                        JSONObject release = new JSONObject(readResponse(connection.getInputStream()));
                        result.put("status", "ok");
                        result.put("tag_name", release.optString("tag_name", ""));
                        result.put("html_url", release.optString("html_url", RELEASES_PAGE));
                    } else {
                        result.put("status", "error");
                        result.put("message", "GitHub HTTP " + responseCode);
                    }
                } catch (Exception exception) {
                    try {
                        result.put("status", "error");
                        result.put("message", exception.getClass().getSimpleName());
                    } catch (Exception ignored) {
                        // JSONObject is only used to move a small status object back to the UI.
                    }
                } finally {
                    if (connection != null) connection.disconnect();
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

        @JavascriptInterface
        public void openRelease(String url) {
            Uri releaseUri = Uri.parse(url == null ? RELEASES_PAGE : url);
            String path = releaseUri.getPath();
            boolean isTrustedRelease = "https".equals(releaseUri.getScheme())
                    && "github.com".equals(releaseUri.getHost())
                    && path != null
                    && path.startsWith("/AlfaGideon/RPGGameAnime/releases");
            if (!isTrustedRelease) releaseUri = Uri.parse(RELEASES_PAGE);

            final Uri targetUri = releaseUri;
            mainHandler.post(() -> {
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, targetUri));
                } catch (Exception ignored) {
                    // The UI will remain usable if the device has no browser available.
                }
            });
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
