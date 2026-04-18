# 🎓 UniMate – Student Productivity SaaS

UniMate is a mobile-first SaaS platform designed to help university students manage their academic life efficiently — from schedules and tasks to grades and announcements — all in one place.

---

## 🚀 Overview

Students often struggle with fragmented systems:

* LMS for assignments
* Notice boards for announcements
* Separate portals for grades

UniMate unifies everything into a **single, clean, and actionable interface**.

---

## ✨ Core Features

### 🏠 Home Dashboard

* Daily class overview (Today-focused banner)
* Attendance & GPA snapshot
* Tasks preview (assignments, quizzes, deadlines)
* Upcoming event highlights
* Latest announcements

---

### 📅 Schedule

* Weekly view with day selection
* “Now” and “Next” class indicators
* Clean timeline of daily classes

---

### ✅ Tasks (Assignments + Quizzes + Deadlines)

* Unified task system
* Categorized by type (Assignment, Quiz, Deadline)
* Designed for action-first workflow

---

### 🎉 Events

* University and departmental events
* Quick access to upcoming activities

---

### 📢 Announcements

* Important notices, rules, and updates
* Optional media support (images for events)
* Filter by type (Important, Event, Notice)

---

### 📊 Grades

* Semester-wise breakdown
* GPA per semester
* Drill-down into subjects
* CGPA (planned via backend)

---

### 👤 Profile

* Academic + personal information
* Clean structured layout

---

## 🧠 Product Philosophy

UniMate is built around two core principles:

### 1. Information vs Action

* **Updates** → what you should know
* **Tasks** → what you should do

### 2. Today-Focused UX

* Prioritize what matters *now*
* Reduce clutter
* Improve decision speed

---

## 🏗️ Tech Stack

### Frontend

* React Native (Expo)
* React Navigation
* Context API (state management)

### Backend (Planned)

* Node.js + Express
* MongoDB
* REST API

---

## 📁 Project Structure

```
/screens        → App screens (Home, Schedule, Tasks, etc.)
/components     → Reusable UI components
/context        → Global state (UserContext)
/data           → Mock data (temporary)
/theme          → Colors, fonts, spacing
/navigation     → App navigation setup
```

---

## 🔄 Data Architecture (Simplified)

Grades are structured by semester:

```
Semester
  ├── GPA
  ├── Total Credits
  └── Subjects (grades)
```

CGPA will be calculated on the backend:

```
CGPA = Σ (semester GPA × credits) / total credits
```

---

## 🔐 Authentication Flow

* Login-based access
* Protected routes via navigation stack

---

## 📦 Current Status

* UI: ✅ Completed (core screens)
* Navigation: ✅ Structured
* Data: ⚠️ Mock (frontend)
* Backend: ⏳ In progress

---

## 🛠️ Future Improvements

* Backend integration (API-driven data)
* CGPA auto-calculation
* Task prioritization (Today / Upcoming / Overdue)
* Push notifications
* Offline support
* Analytics dashboard

---

## 🎯 Target Users

* University students
* Department-level deployments
* Academic institutions

---

## 📌 Vision

To become a **central academic operating system** for students — replacing scattered tools with one intelligent platform.

---

## 👨‍💻 Author

Developed as part of a full-stack SaaS project.

---
