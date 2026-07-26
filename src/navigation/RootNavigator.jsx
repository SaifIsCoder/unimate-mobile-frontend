import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../context/UserContext';
import { ROUTES } from './routes';
import MainStackNavigator from './MainStackNavigator';
import Login from '../screens/auth/Login';
import SetPasswordScreen from '../screens/auth/SetPasswordScreen';

const Stack = createNativeStackNavigator();

// Top-level auth gate:
//   no user            → Login
//   needs password set → SetPassword
//   otherwise          → main app (tabs + detail stack)
export default function RootNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      ) : user.needsPasswordReset ? (
        <Stack.Screen name={ROUTES.SET_PASSWORD} component={SetPasswordScreen} />
      ) : (
        <Stack.Screen name={ROUTES.MAIN_TABS} component={MainStackNavigator} />
      )}
    </Stack.Navigator>
  );
}
