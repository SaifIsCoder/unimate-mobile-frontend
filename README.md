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

### 📅 Schedule Management
* Weekly class schedule
* Day-wise navigation
* “Now” and “Next” class indicators

### ✅ Tasks Management
* Unified system for assignments, quizzes, and deadlines
* Action-oriented interface

### 📊 Grades System
* Semester-wise results
* Subject-level breakdown
* GPA per semester
* CGPA (planned via backend)

### 📢 Announcements & 🎉 Events
* Departmental notices
* Academic rules and updates
* University and department events

### 👤 Student Profile
* Academic and personal details

---

## 🏗️ Technology Stack

### Frontend
* React Native (Expo)
* React Navigation
* Context API

### Backend
* Supabase (Authentication, Database)

---

## 📁 Detailed Project Overview: Modules & Functions

The application is structured using a clean, scalable component-based architecture inside the `src/` directory.

### 1. 📂 Screens (`/src/screens`)
Contains the main views and user interfaces of the application.
* **Core Screens**: 
  * `HomeScreen.js`: Displays the dashboard overview.
  * `ScheduleScreen.js`: Shows the class timetable and daily schedule.
  * `TasksScreen.js`: Lists pending assignments, quizzes, and deadlines.
  * `ProfileScreen.js`: User's personal and academic profile.
  * `NotificationsScreen.js`: History of recent alerts.
  * `SplashScreen.jsx`: The loading screen displayed on app startup.
* **Auth (`/auth`)**:
  * `Login.jsx`: User authentication interface.
  * `SetPasswordScreen.jsx`: Screen for users to configure their password.
* **Grades (`/grades`)**:
  * `GradesScreen.js`: Main grade overview.
  * `AllSemesters.jsx`: Detailed breakdown of grades across all semesters.
  * `SetGPAGoalScreen.js`: Allows users to set target GPA goals.
* **Updates (`/updates`)**:
  * `UpdatesScreen.jsx`: Central hub for announcements and community posts.
  * `AnnouncementsTab.jsx`: Displays official notices.
  * `CommunityTab.jsx`: Student forum and discussions.
  * `CreateCommunityPost.jsx`: Interface to publish a new community post.

### 2. 🧩 Components (`/src/components`)
Reusable UI elements utilized across various screens.
* **Global Components**:
  * `Header.jsx`: Custom top navigation bar.
  * `Background.jsx`: Standardized background layout.
  * `UserDrawer.jsx`: Side navigation drawer for quick access.
  * `NotificationBell.jsx`: Icon showing unread notification count.
  * `SeedButton.jsx`: Shared styled button element.
  * `SharedComponents.js`: Utility UI components exported centrally.
* **Community (`/community`)**:
  * `PostPreview.jsx`: Snippet view for community posts.
  * `AchievementSelector.jsx`: UI for selecting/displaying student achievements.

### 3. 🌐 Services (`/src/services`)
Handles external data fetching, APIs, and background tasks.
* **`apiClient.js`**: Core HTTP client handling requests, token management, and errors.
  * `apiRequest(url, options, retryCount)`: Centralized API call handler.
  * `setTokens()`, `getAccessToken()`, `getRefreshToken()`, `clearTokens()`: Token management.
  * `getUserProfile()`, `setUserProfile()`: Cache handling for user data.
* **`authService.js`**: Authentication specific logic.
  * `loginUser(email, password, tenantCode)`: Authenticates user.
  * `logoutUser()`: Clears session.
  * `getCurrentUser()`, `loadCachedUser()`: Retrieves active user session.
* **`notificationService.js`**: Push notifications and local alerts logic.
  * `requestPermissions()`: Prompts user for notification access.
  * `scheduleNotification()`, `scheduleDelayedNotification()`: Triggers local notifications.
  * `cancelNotification()`, `cancelAllNotifications()`: Removes scheduled alerts.
  * `getAllScheduledNotifications()`: Retrieves pending notifications.

### 4. 🧠 Context (`/src/context`)
Global state management using React's Context API.
* **`UserContext.js`**: 
  * `UserProvider`: Wraps the app to provide user state.
  * `useUser()`: Custom hook to access auth state, profile, and login/logout methods globally.
* **`NotificationContext.js`**: 
  * `NotificationProvider`: Manages incoming and unread notifications.
  * `useNotifications()`: Custom hook to interact with notification data across screens.

### 5. 🛠️ Configuration & Constants (`/src/config` & `/src/constants`)
* **`/config`**:
  * `api.js`: API endpoints and base URL definitions.
  * `supabase.js`: Configuration for Supabase services (if applicable).
* **`/constants`**:
  * `colors.js`, `sizes.js`: Standardized design tokens.
  * `routes.js`: Navigation route names.
  * `roles.js`: User role mappings.
  * `notificationConstants.js`: Notification types and formatting.

### 6. 🗃️ Data & Theme (`/src/data` & `/src/theme`)
* **`mockData.js`**: Contains dummy JSON data for development before backend integration.
* **`theme.js`**: Global stylesheet definitions and custom theme settings.

### 7. 🧭 Navigation
* **`AppNavigator.jsx`**: Configures React Navigation (Stacks, Tabs, and Drawers) routing the screens together.

---

## 🔐 Authentication

* Login-based access system via `/services/authService.js`
* User session managed globally via `UserContext`
* Access tokens securely managed via `apiClient.js`

---

## 📦 Current Status

* UI Design: ✅ Completed
* Navigation: ✅ Implemented
* Data Handling: ⚠️ Mock data (Transitioning to Supabase)
* Backend Integration: ⏳ In progress (Supabase initialized)

---

## 🚧 Future Enhancements

* Backend integration (API-based system)
* Automatic CGPA calculation
* Notifications system full integration
* Data synchronization

---

## 🎓 Academic Context

This project is developed as a **Final Year Project (FYP)** for:

> **University of Sargodha**
> Department of Computer Science

---

## 👨‍💻 Developer

Developed by a final year student as part of undergraduate degree requirements.
