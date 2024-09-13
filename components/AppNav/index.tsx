import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActualiteScreen from '../../screens/Actualites/index';
import { ExercisesScreen } from '../../screens/exercises/index';
import ProfilScreen from '../../screens/Profil/index';
import LoginScreen from '../../screens/login';
import theme from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import HomeScreen from '../../screens/home';

const Stack = createStackNavigator();

function BottomTabs() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'actualite', title: 'Actualité', focusedIcon: 'newspaper' },
		{ key: 'exercices', title: 'Exercices', focusedIcon: 'dumbbell' },
    { key: '', title: 'Explorer', focusedIcon: 'compass' }, 
		{ key: 'profil', title: 'Profil', focusedIcon: 'account' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		actualite: ActualiteScreen,
		exercices: ExercisesScreen,
		profil: ProfilScreen,
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
			barStyle={{
				backgroundColor: theme.colors.backgroundNav,
				borderTopWidth: 1,
				borderTopColor: theme.colors.border,
				height: 90,
			}}
      activeColor= '#2F80ED'
      inactiveColor='#2F80ED'
		/>
	);
}

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
					name='BottomBar'
					component={BottomTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNav;
