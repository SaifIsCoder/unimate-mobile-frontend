import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import TabNavigator from './TabNavigator';

import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Login from '../screens/auth/Login';
import CreateCommunityPost from '../screens/updates/CreateCommunityPost';
import SetGPAGoalScreen from '../screens/grades/SetGPAGoalScreen';
import AllSemestersScreen from '../screens/grades/AllSemesters';
import SetPasswordScreen from '../screens/auth/SetPasswordScreen';
import EventsScreen from '../screens/EventsScreen';
import AttendanceScreen from '../screens/AttendanceScreen';

const MainStack = createNativeStackNavigator();

// Tabs + screens reachable from tabs that should not appear in the tab bar.
export default function MainStackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={ROUTES.TABS} component={TabNavigator} />
      <MainStack.Screen name={ROUTES.NOTIFICATIONS} component={NotificationsScreen} />
      <MainStack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <MainStack.Screen name={ROUTES.LOGIN} component={Login} />
      <MainStack.Screen name={ROUTES.CREATE_COMMUNITY_POST} component={CreateCommunityPost} />
      <MainStack.Screen name={ROUTES.SET_GPA_GOAL} component={SetGPAGoalScreen} />
      <MainStack.Screen name={ROUTES.ALL_SEMESTERS} component={AllSemestersScreen} />
      <MainStack.Screen name={ROUTES.SET_PASSWORD} component={SetPasswordScreen} />
      <MainStack.Screen name={ROUTES.EVENTS} component={EventsScreen} />
      <MainStack.Screen name={ROUTES.ATTENDANCE} component={AttendanceScreen} />
    </MainStack.Navigator>
  );
}
