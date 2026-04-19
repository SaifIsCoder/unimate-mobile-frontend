// ─── APP.JS — UniMate Student App ─────────────────────────────────────────────
// Entry point. Manages the global state and React Navigation stack.

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/UserContext';
import { NotificationProvider } from './src/context/NotificationContext';
import AppNavigator from './src/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  return (
    <SafeAreaProvider>
      <UserProvider>
        <NotificationProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </NotificationProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
