# Student Details & Management Portal

A modern, responsive, and lightweight Student Management Portal built with plain **HTML5**, **CSS3**, and **JavaScript (ES6+)**. The portal runs with zero build steps or external frameworks, persisting all student records and profile photos directly in the browser's `localStorage`.

---

## ✨ Features

- **Modern Dashboard**: 
  - Real-time student profile banner with attendance and assignment statistics.
  - Interactive attendance progress bars and course breakdown.
  - Weekly timetable matrix.
  - Quick action links (Apply Leave, View Assignments, Edit Profile, Fees).
  - Recent announcements and upcoming assignment deadlines.
- **Campus Placements & Offers**:
  - Highlights verified job offers from 4 top companies (Microsoft, AWS, Oracle, Qualcomm) with packages up to 28.5 LPA.
  - Tracks specific interview rounds cleared for each company.
  - One-click **"Download Placement File"** dossier feature.
- **27 Sidebar Navigation Modules**:
  - Dashboard, Institution, Profile, Messages, Attendance, Assignments, Exams, Reports, Assessments, Holidays, Timetable, Teaching Content, Leave Management, Services, Billing, Counselling, Clearance, Announcements, Feedback, Campus Gallery, Projects, Results, Re-Evaluation, Exam Registration, Document Records, Alumni Association, and Eduverse.
- **Photo Upload & Profile Management**:
  - Upload JPG, PNG, or WEBP photos with real-time modal preview and canvas compression.
  - Form validation for required fields, email formatting, phone numbers, and dates.
  - Immediate DOM updates across the portal and persistent storage in `localStorage`.
- **Keyboard Shortcuts & Utilities**:
  - **Ctrl+K** quick search launcher for instant page and action routing.
  - Seamless Light / Dark theme toggling.
  - Copy Admission Number to clipboard with fallback.
  - Download full profile records as a text file.
- **Fully Responsive & Accessible**:
  - Tested across mobile (360px, 390px), tablet (768px, 1024px), and desktop (1440px) viewports in both portrait and landscape.
  - Mobile slide-out drawer with backdrop overlay.
  - Responsive tables with horizontal side-scrolling (`.tw`).
  - Strict touch target compliance (all buttons >= 44px).

---

## 🚀 Getting Started

No build tools, npm packages, or compilers required. Simply serve the directory with any static HTTP server:

### Using Python:
```bash
python -m http.server 5500
```

### Using Node / npx:
```bash
npx serve -l 5500
```

Open your browser and navigate to:
```
http://localhost:5500
```

---

## 📁 Project Structure

```
├── index.html       # Semantic HTML5 layout and modal dialogs
├── style.css        # Clean CSS design system, dark mode tokens & responsive media queries
├── script.js        # Core SPA routing, state management, form validation & localStorage
├── .gitignore       # Git ignore rules for archives and local scratch files
└── README.md        # Project documentation
```

---

## 🔒 Privacy & Data

All student profiles, profile images, leave requests, and assignment progress are saved locally in the browser's `localStorage`. No data or media is sent to external servers.
