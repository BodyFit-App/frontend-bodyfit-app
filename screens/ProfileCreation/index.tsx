import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import TextField from '../../components/TextField/TextField';
import CustomButton from '../../components/CustomButton/CustomButton';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import theme from '../../theme';

export default function ProfileCreationScreen() {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			pseudo: '',
			firstName: '',
			lastName: '',
			profileImage: '',
		},
	});

	const pseudoValue = watch('pseudo');

	const onSubmit = (data: any) => {
		console.log('Profile Data:', data);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.imagePseudoContainer}>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<View style={styles.imagePickerContainer}>
							<ImagePicker
								onChange={onChange}
								value={value}
								style={styles.imagePicker}
							/>
						</View>
					)}
					name='profileImage'
				/>

				<View style={styles.pseudoDisplayContainer}>
					<Text style={styles.pseudoText}>@{pseudoValue || 'pseudo'}</Text>
				</View>
			</View>

			<Controller
				control={control}
				rules={{ required: 'Le pseudo est requis' }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextField
						label='Pseudo'
						placeholder='Entrez votre pseudo'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						error={!!errors.pseudo}
						style={styles.textInput}
						mode='outlined'
					/>
				)}
				name='pseudo'
			/>
			{errors.pseudo && (
				<Text style={styles.errorText}>{errors.pseudo.message}</Text>
			)}

			<Controller
				control={control}
				rules={{ required: 'Le prénom est requis' }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextField
						label='Prénom'
						placeholder='Entrez votre prénom'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						error={!!errors.firstName}
						style={styles.textInput}
						mode='outlined'
					/>
				)}
				name='firstName'
			/>
			{errors.firstName && (
				<Text style={styles.errorText}>{errors.firstName.message}</Text>
			)}

			<Controller
				control={control}
				rules={{ required: 'Le nom est requis' }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextField
						label='Nom'
						placeholder='Entrez votre nom'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						error={!!errors.lastName}
						style={styles.textInput}
						mode='outlined'
					/>
				)}
				name='lastName'
			/>
			{errors.lastName && (
				<Text style={styles.errorText}>{errors.lastName.message}</Text>
			)}

			<CustomButton onPress={handleSubmit(onSubmit)}>
				Créer le profil
			</CustomButton>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
		flexGrow: 1,
		justifyContent: 'center',
	},
	imagePseudoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 32,
	},
	imagePickerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 26,
	},
	imagePicker: {
		width: 150,
		height: 150,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},

	pseudoDisplayContainer: {
		marginLeft: 16,
	},
	pseudoText: {
		fontSize: 24,
		fontWeight: '600',
		color: theme.colors.textFollow,
	},
	textInput: {
		marginBottom: 20,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginBottom: 10,
		textAlign: 'left',
	},
});
