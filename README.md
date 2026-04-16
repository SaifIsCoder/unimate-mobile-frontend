# uniMate - Campus Companion

A React Native mobile application built with Expo for managing campus life, including assignments, events, schedules, and notifications.

## Features

- 🔐 User Authentication (Supabase Auth)
- 📚 Assignments Management
- 📅 Events & Schedule
- 🔔 Notifications
- 👤 User Profile
- 📱 Cross-platform (iOS, Android, Web)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Supabase project setup

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd client
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials to `.env`:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

## Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── config/        # Supabase and API configuration
├── constants/     # App constants (colors, routes, etc.)
├── context/       # React Context providers
├── screens/       # Screen components
├── services/      # Business logic and API services
└── scripts/       # Utility scripts (data seeding, etc.)
```

## Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **Backend**: Supabase (Auth, Database), Custom API (/api/v1)
- **State Management**: React Context
- **Notifications**: Expo Notifications

## License

Private
