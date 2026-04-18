# 🎓 UniMate – Student Management App

### (Final Year Project – University of Sargodha)

UniMate is a mobile application developed as a Final Year Project (FYP) for the **University of Sargodha**, designed to help students manage their academic activities in one unified system.

---

## 📌 Problem Statement

Students at the University of Sargodha currently rely on multiple disconnected sources:

* Notice boards for announcements
* LMS/teachers for assignments
* Manual tracking for schedules and grades

This leads to:

* Missed deadlines
* Poor organization
* Lack of a centralized system

---

## 🎯 Objective

To build a **centralized mobile application** that allows students to:

* Track daily schedules
* Manage academic tasks (assignments, quizzes, deadlines)
* View grades and GPA
* Stay updated with announcements and events

---

## ✨ Features

### 🏠 Home Dashboard

* Daily overview of classes
* GPA and attendance snapshot
* Upcoming tasks and events
* Latest announcements

---

### 📅 Schedule Management

* Weekly class schedule
* Day-wise navigation
* “Now” and “Next” class indicators

---

### ✅ Tasks Management

* Unified system for:

  * Assignments
  * Quizzes
  * Deadlines
* Action-oriented interface

---

### 📊 Grades System

* Semester-wise results
* Subject-level breakdown
* GPA per semester
* CGPA (planned via backend)

---

### 📢 Announcements

* Departmental notices
* Academic rules and updates
* Event-related information

---

### 🎉 Events

* University and department events
* Upcoming activities tracking

---

### 👤 Student Profile

* Academic and personal details
* Structured information layout

---

## 🧠 System Design Approach

The application is designed using a **student-centric approach**:

* Focus on *daily usability*
* Clear separation between:

  * **Updates (information)**
  * **Tasks (actions)**

---

## 🏗️ Technology Stack

### Frontend

* React Native (Expo)
* React Navigation
* Context API

### Backend (Planned)

* Node.js + Express
* MongoDB

---

## 📁 Project Structure

```id="p93xq1"
/screens        → Application screens
/components     → Reusable UI components
/context        → State management
/data           → Mock data (for development)
/theme          → Styling system
/navigation     → Navigation setup
```

---

## 🔄 Data Structure (Example)

Grades are organized by semester:

```id="c2k8s9"
Semester
  ├── GPA
  ├── Total Credits
  └── Subjects (Grades)
```

---

## 🔐 Authentication

* Login-based access system
* User session managed via Context API

---

## 📦 Current Status

* UI Design: ✅ Completed
* Navigation: ✅ Implemented
* Data Handling: ⚠️ Mock data
* Backend Integration: ⏳ In progress

---

## 🚧 Future Enhancements

* Backend integration (API-based system)
* Automatic CGPA calculation
* Notifications system
* Data synchronization

---

## 🎓 Academic Context

This project is developed as a **Final Year Project (FYP)** for:

> **University of Sargodha**
> Department of Computer Science

---

## 👨‍💻 Developer

Developed by a final year student as part of undergraduate degree requirements.

---
