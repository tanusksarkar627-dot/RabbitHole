// Global tracking object
let currentTracking = {
    domain: null,
    startTime: null
};

// 1. Listen for Tab URL updates instantly
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Fire as soon as the tab completes its structural navigation routine
    if (changeInfo.status === 'complete' && tab.url) {
        handleTabChange(tab.url, tabId);
    }
});

// 2. Handle focus checks and calculate transitions
function handleTabChange(url, tabId) {
    if (!url || url.startsWith('chrome://') || url.startsWith('about:')) return;

    try {
        const hostname = new URL(url).hostname;
        const now = Date.now();

        // Save allocation time for the previous domain
        if (currentTracking.domain && currentTracking.startTime) {
            const durationMins = (now - currentTracking.startTime) / 1000 / 60;
            if (typeof saveTimeAllocation === 'function') {
                saveTimeAllocation(currentTracking.domain, durationMins);
            }
        }

        // Check for specific distraction states
        const isShorts = url.includes('://youtube.com') || url.includes('tiktok.com');
        const isEntertainment = hostname.includes('netflix.com') || 
                               (hostname.includes('youtube.com') && !isShorts) || 
                               hostname.includes('twitch.tv');

        // Fire the alert down to the tab immediately
        if (isShorts) {
            triggerFocusAlert(tabId, "Shorts Video Detected! Don't get trapped down the rabbit hole.");
        } else if (isEntertainment) {
            triggerFocusAlert(tabId, "Entertainment Shift Detected! Remember to get back to learning soon.");
        }

        // Update current tracking domain
        currentTracking.domain = hostname;
        currentTracking.startTime = now;

    } catch (e) {
        console.error("URL parsing error: ", e);
    }
}

// 3. Inject the popup alert directly into the active webpage tab safely
function triggerFocusAlert(tabId, alertMessage) {
    chrome.tabs.sendMessage(tabId, {
        action: "SHOW_FOCUS_ALERT",
        message: alertMessage
    }).catch(() => {
        // If content script fails or page refreshes dynamically, inject a fallback alert
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: (msg) => { alert(`⚠️ Focus Shift Warning!\n\n${msg}`); },
            args: [alertMessage]
        }).catch(err => console.error("Fallback script injection failed:", err));
    });
}
