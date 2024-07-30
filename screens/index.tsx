import React from 'react';
import LoginScreen from './login';
import { NativeRouter, Route, Routes } from 'react-router-native';

const Screens = () => {
	return (
		<NativeRouter>
			<Routes>
				<Route
					path='/'
					element={<LoginScreen />}
				/>
			</Routes>
		</NativeRouter>
	);
};

export default Screens;
