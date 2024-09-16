import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/login';
import theme from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import ExerciseFormScreen from '../../screens/ExerciseFormScreen';
import { BottomTabs } from '../BottomTabs/BottomTabs';
import HomeScreen from '../../screens/home';
import ProgramFormScreen from '../../screens/ProgramFormScreen';
import RegisterScreen from '../../screens/register';
import CreateProfilScreen from '../../screens/ProfileCreation';

const Stack = createStackNavigator();

function AppNav() {
	const { session } = useAuth();

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator>
				{/* TODO: Uncomment later to protect routes 
         {session ? (
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )} */}

				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='ProgramFormScreen'
					options={{ title: 'Créer mon exercice' }}
					component={ProgramFormScreen}
				/>

				<Stack.Screen
					name='ExerciseCreation'
					options={{ title: 'Créer mon exercice' }}
					component={ExerciseFormScreen}
				/>

				<Stack.Screen
					name='BottomTabs'
					component={BottomTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='CreateProfil'
					component={CreateProfilScreen}
					options={{
						title: 'Créer mon profil',
						headerStatusBarHeight: 30,
						headerStyle: {
							height: 100,
							backgroundColor: 'transparent',
							borderBottomWidth: 1,
							borderBottomColor: theme.colors.border,
						},
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.text,
            },
					}}
				/>
				<Stack.Screen
					name='Register'
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNav;
