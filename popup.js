chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs && tabs.length > 0) {
    const activeTab = tabs[0];
    if (!activeTab.url || activeTab.url.startsWith("chrome://")) {
      return;
    }
    const url = new URL(activeTab.url);
    const title = activeTab.title || url.hostname;

    // 1. Grab the productivity metrics computed by your background service worker
    chrome.storage.local.get(['sessionData', 'productivityScore'], function (stored) {
      const currentSessionData = stored.sessionData || { "AI / Tech": 0, "Entertainment": 0, "Shorts": 0 };
      const currentScore = stored.productivityScore !== undefined ? stored.productivityScore : 100;

      // 2. Add the metrics to your data object (using matching casing)
      const activeLogData = {
        domain: url.hostname,
        title: title,
        sessionData: currentSessionData,
        productivityScore: currentScore
      };

      const iframe = document.getElementById('dashboard-frame');

      // 3. Repeatedly attempt transmission until the dashboard page catches it
      const messageInterval = setInterval(() => {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            { type: "LIVE_BROWSER_TRACKING", data: activeLogData },
            "*"
          );
        }
      }, 300); // Retries every 300ms until cleared

      // 4. Stop the repeating loop once Next.js acknowledges receipt
      window.addEventListener("message", function (event) {
        if (event.data && event.data.type === "TRACKING_RECEIVED") {
          clearInterval(messageInterval);
          console.log("Handshake successful! Stopped pinging loop.");
        }
      });
    });
  }
});