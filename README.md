# VitalSync - AI-Powered Medical Triage Platform

![VitalSync Banner](https://via.placeholder.com/1200x400/0f111a/6366f1?text=VitalSync+-+Intelligent+Health+Triage)

## Overview

**VitalSync** is an innovative, patient-centric AI triage platform designed to efficiently assess, prioritize, and manage patient symptoms. Our solution directly addresses the critical health tech challenge of clinical overload and excessive patient wait times by introducing a smart, automated sorting system.

When patients experience symptoms, they often lack the medical knowledge to determine urgency. VitalSync solves this by offering an intuitive **Patient Portal** where symptoms can be described in natural language. Our proprietary (mocked) AI engine acts as the first line of defense, instantly calculating a severity score. Simultaneously, the **Provider Dashboard** automatically organizes a live queue, pushing critical cases to the top, ensuring healthcare professionals see the right patients at the right time.

## 🚀 Features

- **Natural Language Symptom Assessment**: Patients can confidently describe what they feel in plain English.
- **Intelligent Triage Engine**: Instant categorization of urgency (Critical, Urgent, Routine) based on symptomatic keyword heuristics.
- **Provider Dashboard**: A real-time, self-sorting queue that dynamically updates based on triage severity and wait times.
- **Premium Glassmorphic UI**: High-end user experience utilizing a modern dark theme and seamless micro-animations, designed to reduce cognitive load for both patients and doctors.
- **Zero Dependencies**: Incredibly fast, ultra-portable frontend utilizing Vanilla HTML, CSS, and JS to ensure maximum compatibility.

## 🛠 Tech Stack & Tools

- **Frontend Core**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling Architecture**: Custom CSS Variables, Glassmorphism, CSS Grid/Flexbox
- **Icons**: Phosphor Icons (CDN)
- **Deployment Structure**: Static Single Page Application (SPA), easily hostable on GitHub Pages, Vercel, or Netlify.

## ⚙️ Installation / Setup Instructions

Since VitalSync is built with a zero-dependency architecture for maximum portability and speed, setup is instantaneous.

### Option 1: Quick Start (Recommended)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/vitalsync.git
   cd vitalsync
   ```
2. **Launch the Application**:
   Simply open the `index.html` file in any modern web browser to experience the prototype.
   ```bash
   open index.html # on macOS
   start index.html # on Windows
   xdg-open index.html # on Linux
   ```

### Option 2: Local Web Server
If you prefer testing over HTTP (useful for local network device testing):
1. **Using Python**:
   ```bash
   python3 -m http.server 8000
   ```
2. Navigate to `http://localhost:8000` in your browser.

## 🧠 Technical Workflow

1. **Input Phase**: The `PatientPortal` captures user input (Name, Symptoms) via an accessible HTML form and prevents default submission (`app.js`).
2. **Analysis Phase (Mocked AI)**: `analyzeSymptoms()` intercepts the text block. A simulated latency mimics cloud processing. A heuristic algorithm searches for complex medical indicators (`chest pain`, `high fever`) and assigns a weight.
3. **State Management Phase**: The patient object is instantiated with a severity tag and ISO timestamp, then pushed into the global `appState.patients` array.
4. **Rendering Phase**: The `ProviderDashboard` listens for state mutations. `renderDashboard()` recalculates triage statistics, applies user-selected filters, and dynamically re-injects the ordered DOM nodes, ensuring `$O(N \log N)$` sorting performance based on the assigned `severityWeight`.

## 🏆 Hackathon Judging Criteria Fulfillment

*   **Functionality**: The prototype is fully functional edge-to-edge. Users can seamlessly swap between the asynchronous Patient portal and the live Provider queue.
*   **Code Quality**: Written in pristine, modern ES6+ utilizing proper separation of concerns. CSS uses semantic variables for theming, and the JS leverages modular function design.
*   **Scalability**: The state management structure in `app.js` is designed to be effortlessly ripped out and replaced with a real RESTful API or WebSockets (e.g., Firebase, Socket.io) with zero UI rewrites.
*   **Innovation**: Bypasses traditional binary forms, favoring a natural NLP-style symptom input while employing a unique Provider queue that prioritizes medical need over "first-come-first-serve," potentially saving lives.

---

*Built with ❤️ for [Hackathon Name].*
# Codecure_VitalSync
