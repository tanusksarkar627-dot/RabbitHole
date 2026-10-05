# 🐰 RabbitHole Tracker

> **Detect where your time disappears.** A lightweight, context-aware Chrome extension designed to identify the silent transition from productive research to unintentional distraction.

---

## 📌 Overview

Most productivity tools treat digital distraction as a failure of willpower—slapping hard site blocks or showing depressing end-of-day reports after hours have already been lost.

**RabbitHole Tracker** takes a different approach. Instead of rigid site-blocking or post-mortem analytics, it focuses on **Context-Aware Drift Detection**. It monitors your session flow in real time to help you build awareness right at the moment your focus starts sliding—giving you actionable nudges without breaking your legitimate study or work workflows.

---

## ✨ Key Features

* **Real-Time Daily Focus Score:** A quick visual snapshot of your daily focus efficiency directly in the popup interface.
* **Session Flow Analysis:** Tracks transitions across learning topics (e.g., *Coding Tutorial → General Tech → Short-Form Entertainment*).
* **Just-In-Time Nudge Banner:** Injects a subtle, non-intrusive banner on active web pages right when drift patterns are detected.
* **"Break Buddy" 5-Min Breather:** A one-click wellness feature built into the banner that pauses tracking and triggers a 5-minute countdown with a soothing breathing animation for intentional breaks.
* **Minimalist & Aesthetic Design:** Built with a dark-mode card layout, warm accent colors, and custom iconography optimized for small-screen utility.

---

## 🛠️ Tech Stack

* **Manifest Version:** Chrome Extensions Manifest V3
* **Frontend:** HTML5, CSS3 (Custom CSS Grid/Flexbox Layouts)
* **Logic & Scripts:** Vanilla JavaScript (ES6+ Asynchronous Execution)
* **API Dependencies:** Chrome Extension Messaging API (`chrome.tabs`, `chrome.runtime`)

---

## 📁 Project Structure

```text
rabbithole-extension/
├── manifest.json       # Extension configuration & V3 entry point
├── popup.html          # Extension popup UI structure
├── popup.css           # Custom dark-theme styling & responsive layouts
├── popup.js            # Popup inter-script messaging & tab-query logic
├── contentScript.js    # In-page banner injection & Breather timer logic
└── logo.svg            # Custom SVG vector brand asset
