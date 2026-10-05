// Listen for shift signals from our background worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SHOW_FOCUS_ALERT") {
        // Run a deep check on the page to see if it is an educational video
        if (isPageEducational()) {
            console.log("🐰 RabbitHole: Educational content detected. Skipping popup.");
            return;
        }
        showCustomModal(request.message);
    }
});

// Scans text elements inside YouTube's interface to determine intent
function isPageEducational() {
    const pageText = (
        document.title + " " + 
        (document.querySelector("#metadata-line")?.innerText || "") + " " +
        (document.querySelector("#description-inner")?.innerText || "")
    ).toLowerCase();

    // Comprehensive list of educational keywords
    const educationalKeywords = [
        "tutorial", "course", "learn", "coding", "programming", "education", 
        "lecture", "science", "math", "history", "physics", "chemistry", 
        "biology", "study", "how to", "explained", "bootcamp", "data structure",
        "js", "python", "css", "html", "react", "sql", "guide", "development"
    ];

    // Returns true if any educational word matches the metadata text
    return educationalKeywords.some(keyword => pageText.includes(keyword));
}

function showCustomModal(message) {
    const existingModal = document.getElementById("rabbithole-alert-overlay");
    if (existingModal) existingModal.remove();

    const overlay = document.createElement("div");
    overlay.id = "rabbithole-alert-overlay";
    
    const card = document.createElement("div");
    card.id = "rabbithole-alert-card";

    card.innerHTML = `
        <div class="rh-modal-icon">⚠️</div>
        <h2 class="rh-modal-title">Focus Shift Warning!</h2>
        <p class="rh-modal-text">${message}</p>
        <button id="rh-modal-close-btn">I'll get back to work</button>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById("rh-modal-close-btn").addEventListener("click", () => {
        overlay.remove();
    });
}

// Custom modern CSS layout injection styling
const style = document.createElement("style");
style.textContent = `
    #rabbithole-alert-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(15, 23, 42, 0.75) !important;
        backdrop-filter: blur(8px) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-family: 'Segoe UI', Roboto, sans-serif !important;
    }
    #rabbithole-alert-card {
        background: #ffffff !important;
        padding: 32px !important;
        border-radius: 16px !important;
        width: 100% !important;
        max-width: 420px !important;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15) !important;
        text-align: center !important;
        border: 1px solid #e2e8f0 !important;
        animation: rhSlideIn 0.3s ease-out !important;
    }
    .rh-modal-icon { font-size: 48px !important; margin-bottom: 16px !important; }
    .rh-modal-title { color: #1e293b !important; font-size: 22px !important; font-weight: 700 !important; margin: 0 0 12px 0 !important; }
    .rh-modal-text { color: #64748b !important; font-size: 15px !important; line-height: 1.5 !important; margin: 0 0 24px 0 !important; }
    #rh-modal-close-btn {
        background: #4f46e5 !important;
        color: white !important;
        border: none !important;
        padding: 12px 24px !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        border-radius: 8px !important;
        cursor: pointer !important;
        width: 100% !important;
    }
    #rh-modal-close-btn:hover { background: #4338ca !important; }
    @keyframes rhSlideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
`;
document.head.appendChild(style);
