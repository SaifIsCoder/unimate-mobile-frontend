import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { useUser } from "./context/UserContext";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AssignmentScreen from "./screens/TasksScreen";
import GradesScreen from "./screens/GradesScreen";
import UpdatesScreen from "./screens/updates/UpdatesScreen";
import Login from "./screens/auth/Login";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Schedule") iconName = "calendar";
          // else if (route.name === "Profile") iconName = "person";
          else if (route.name === "Tasks") iconName = "document-text";
          else if (route.name === "Updates") iconName = "megaphone";
          else if (route.name === "Grades") iconName = "stats-chart";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Updates" component={UpdatesScreen} />
      <Tab.Screen name="Tasks" component={AssignmentScreen} />
      <Tab.Screen name="Grades" component={GradesScreen} />
    </Tab.Navigator>
  );
}

// Main app stack (tabs + screens without tabs)
function MainTabs() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Tabs" component={TabNavigator} />
      {/* Stack screens - accessible from tabs but don't show in tab bar */}
      <MainStack.Screen name="Notifications" component={NotificationsScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
