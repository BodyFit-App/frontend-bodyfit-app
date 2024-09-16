import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import useAvatarUpload from '../../hooks/useAvatarUpload';
import ProfilHeader from '../../components/ProfileHeader/ProfileHeader';
import theme from '../../theme';
import CustomButton from '../../components/CustomButton/CustomButton';
import PieChart from 'react-native-pie-chart';
import ObjectifCard from '../../components/ObjectifCard/ObjectifCard';

const ProfilScreen = () => {
	const widthAndHeight = 250;
	const series = [123, 321, 123, 789, 537];
	const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

	return (
		<ScrollView>
			<View style={styles.profilheader}>
				<ProfilHeader
					name='John Doe'
					username='johndoe'
					followers={100}
					profileImage={'image'}
					exercisesCount={10}
					programsCount={5}
					goalsCount={3}
					onEditProfile={() => {}}
					onShareProfile={() => {}}
				/>
			</View>
			<View style={styles.containeract}>
				<Text style={styles.titletxt}>Mon activité</Text>

				<View style={styles.containerbtn}>
					<CustomButton
						children='Exercices'
						style={styles.btn}
						labelStyle={{ fontSize: 12, fontWeight: '600'}}

					/>
					<CustomButton
						children='Temps'
						style={styles.btn}
						labelStyle={{ fontSize: 12, fontWeight: '600' }}
					/>
				</View>
				<View style={styles.containergrah}>
					<PieChart
						widthAndHeight={widthAndHeight}
						series={series}
						sliceColor={sliceColor}
						doughnut={true}
						coverRadius={0.45}
						coverFill={theme.colors.background}
					/>
				</View>
			</View>
			<View style={styles.containerobj}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Text style={styles.titletxt}>Mes objectifs en cours</Text>
					<Text style={styles.subtitletxt}>Tout afficher</Text>
				</View>
				<View style={styles.containerbtn}>
					<ObjectifCard
						title='Perdre du poids'
						description='lorem ipsum dolor sit amet, consectetur adipisciing elit. Carabitur sagitis arcu eros consectetur'
						progress={0}
						startDate='01/01/2021'
						endDate='01/06/2021'
					/>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	profilheader: {
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
	},
	containeract: {
		paddingHorizontal: 16,
		marginTop: 20,
	},
	containerobj: {
		paddingHorizontal: 16,
		marginTop: 20,
	},
	containerbtn: {
		flexDirection: 'row',
		marginTop: 20,
	},
	containergrah: {
		marginTop: 40,
		alignItems: 'center',
	},
	titletxt: {
		color: theme.colors.text,
		fontSize: 20,
		fontWeight: '600',
	},
	subtitletxt: {
		color: theme.colors.textPlaceholder,
		fontSize: 12,
		fontWeight: '600',
	},
	text: {
		color: '#2F80ED',
		fontSize: 24,
	},
	btn: {
		marginRight: 10,
		padding: 0,
	},
});

export default ProfilScreen;
