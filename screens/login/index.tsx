import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import TextField from '../../components/TextField/TextField';
import CustomButton from '../../components/CustomButton/CustomButton';
import theme from '../../theme';

const LoginScreen = () => {
	const { signIn } = useAuth();
	const navigation = useNavigation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		const { error } = await signIn(email, password);

		if (!error) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'Home' as never }],
			});
		} else {
			console.log('Erreur de connexion', error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/logo-app.png')}
				style={styles.img}
			/>
			<View>
				<Text style={styles.title}>Bienvenue!</Text>
				<Text style={styles.subtitle}>Connectez-vous a votre compte</Text>
				<TextField
					style={styles.textinput}
					label='Adresse email'
					placeholder='Adresse email'
					value={email}
					onChangeText={(text: string) => setEmail(text)}
					mode='outlined'
				/>

				<TextField
					style={styles.textinput}
					label='Mot de passe'
					placeholder='Mot de passe'
					mode='outlined'
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
				<Text
					onPress={() => navigation.navigate('' as never)}
					style={styles.textmdp}>
					Mot de passe oublié ?
				</Text>

				<CustomButton
					style={styles.button}
					children='Connectez-vous'
					onPress={handleSubmit}
				/>
				<Text style={styles.textregister}>
					Vous n'avez pas de compte ?{' '}
					<Text
						style={{
							textDecorationLine: 'underline',
							color: theme.colors.primary,
              fontWeight:'600',
						}}
						onPress={() => navigation.navigate('Home' as never)}>
						Inscrivez-vous
					</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'transparent',
	},
	title: {
		textAlign: 'center',
		marginBottom: 15,
		fontSize: 48,
		fontWeight: '700',
	},
	subtitle: {
		textAlign: 'center',
		marginBottom: 55,
		fontSize: 16,
		fontWeight: '500',
		color: '#79797F',
	},
	textmdp: {
		textAlign: 'right',
		marginBottom: 50,
		marginRight: 40,
		color: '#79797F',
		fontStyle: 'italic',
    fontWeight:'600',
    fontSize: 16,
	},

	textregister: {
		textAlign: 'center',
		marginBottom: 50,
		fontWeight: '600',
		color: '#79797F',
		fontStyle: 'italic',
    fontSize: 16,
	},
	img: {
		width: '70%',
		height: 200,
		marginHorizontal: 'auto',
		marginBottom: 50,
	},
	textinput: {
		marginBottom: 25,
		width: '80%',
		marginHorizontal: 'auto',
	},
	button: {
		marginBottom: 15,
		width: '80%',
		marginHorizontal: 'auto',
	},
});

export default LoginScreen;
