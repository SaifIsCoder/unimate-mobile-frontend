import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { ROUTES } from './routes';

import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import UpdatesScreen from '../screens/updates/UpdatesScreen';
import TasksScreen from '../screens/TasksScreen';
import GradesScreen from '../screens/grades/GradesScreen';

const Tab = createBottomTabNavigator();

// Route name → MaterialIcons glyph.
const TAB_ICONS = {
  [ROUTES.HOME]: 'home-filled',
  [ROUTES.SCHEDULE]: 'calendar-month',
  [ROUTES.TASKS]: 'task-alt',
  [ROUTES.UPDATES]: 'campaign',
  [ROUTES.GRADES]: 'query-stats',
};

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: COLORS.card,
    borderTopWidth: 0,
    height: 55,
    elevation: 0,
  },
  tabBarIcon: ({ color, size }) => (
    <MaterialIcons name={TAB_ICONS[route.name]} size={size} color={color} />
  ),
});

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.SCHEDULE} component={ScheduleScreen} />
      <Tab.Screen name={ROUTES.UPDATES} component={UpdatesScreen} />
      <Tab.Screen name={ROUTES.TASKS} component={TasksScreen} />
      <Tab.Screen name={ROUTES.GRADES} component={GradesScreen} />
    </Tab.Navigator>
  );
}
