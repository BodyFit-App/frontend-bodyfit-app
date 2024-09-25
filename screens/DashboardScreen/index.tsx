import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import ProfilHeader from '../../components/ProfileHeader/ProfileHeader';
import theme from '../../theme';
import CustomButton from '../../components/CustomButton/CustomButton';
import PieChart from 'react-native-pie-chart';
import ObjectifCard from '../../components/ObjectifCard/ObjectifCard';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileById, fetchProgress } from '../../api/profiles';
import { getPublicUrl } from '../../lib/supabase';
import ItemCard from '../../components/ItemCard';
import { StackScreenProps } from '@react-navigation/stack';
import { AppParamListBase } from '../../navigations/main';
import { FabDashboard } from '../../components/FabDashboard/FabDashboard';
import { Portal } from 'react-native-paper';

const DashboardScreen = ({
	navigation,
	route,
	...props
}: StackScreenProps<AppParamListBase, 'HomeScreen'>) => {
	const { session, signOut } = useAuth();
	const profileId = session?.user.user_metadata.profile_id;

	const { data: profile } = useQuery({
		queryKey: ['profile', profileId],
		queryFn: () => fetchProfileById(profileId),
		enabled: !!profileId,
	});

	const { data: progress, error: pr } = useQuery({
		queryFn: fetchProgress,
		queryKey: ['progress'],
	});


	const [chartData, setChartData] = useState<number[]>([]);
	const [sliceColors, setSliceColors] = useState<string[]>([]);
	const [chartLabels, setChartLabels] = useState<string[]>([]);

	useEffect(() => {
		if (progress) {
			// Agrège les données de temps total par catégorie
			const categoryData = progress.reduce(
				(acc: { [key: string]: number }, current) => {
					const category = current.name;
					if (category) {
						acc[category] =
							(acc[category] || 0) + (current.total_estimated_time || 0);
					}
					return acc;
				},
				{}
			);

			// Sépare les clés (catégories) et les valeurs (temps) pour alimenter le graphique
			const data = Object.values(categoryData);
			const labels = Object.keys(categoryData);

			// Vérifie s'il y a des données valides
			if (data.some((value) => value > 0)) {
				const colors = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

				// Limite ou boucle les couleurs en fonction du nombre de catégories
				const colorsForChart = colors.slice(0, data.length);
				setChartData(data);
				setSliceColors(colorsForChart);
				setChartLabels(labels);
			} else {
				// Si toutes les valeurs sont 0, on réinitialise les données
				setChartData([]);
				setSliceColors([]);
				setChartLabels([]);
			}
		}
	}, [profile]);

	const pieChartColors = chartData.length > 0 ? sliceColors : [];
	const pieChartLabels = chartData.length > 0 ? chartLabels : [];

	return (
		<View>
			<ScrollView>
				<View style={styles.profilheader}>
					{profile && (
						<ProfilHeader
							firstname={profile.firstname ?? ''}
							lastname={profile.lastname ?? ''}
							username={profile.pseudo ?? ''}
							followers={profile.followedBy?.length ?? 0}
							profileImage={getPublicUrl('images', profile.avatar_url ?? '')}
							exercisesCount={profile.exercises?.length ?? 0}
							programsCount={profile.programs?.length ?? 0}
							goalsCount={
								profile.goals?.filter(({ achieved }) => achieved).length ?? 0
							}
							onEditProfile={() => {
								navigation.push('ProfileFormScreen');
							}}
							onSignOutProfile={() => {
								signOut();
							}}
						/>
					)}
				</View>

				<View style={styles.containeract}>
					<Text style={styles.titletxt}>Mon activité</Text>
		

					<View style={styles.containergrah}>
						{chartData.length > 0 ? (
							<>
								<PieChart
									widthAndHeight={250}
									series={chartData}
									sliceColor={pieChartColors}
									coverRadius={0.5}
									coverFill={theme.colors.background}
								/>
								<View style={styles.legendContainer}>
									{pieChartLabels.map((label, index) => (
										<View
											style={styles.legendItem}
											key={index}>
											<View
												style={[
													styles.legendColor,
													{ backgroundColor: pieChartColors[index] },
												]}
											/>
											<Text style={styles.legendText}>{label}</Text>
										</View>
									))}
								</View>
							</>
						) : (
							<Text style={styles.noDataText}>Aucune donnée disponible</Text>
						)}
					</View>
				</View>

				<View style={styles.containerobj}>
					<View style={styles.headerRow}>
						<Text style={styles.titletxt}>Mes objectifs</Text>
						<Text
							style={styles.subtitletxt}
							onPress={() =>
								navigation.push('GoalListScreen', {
									filters: { profile_id: profileId },
								})
							}>
							Tout afficher
						</Text>
					</View>
					<View style={styles.containercard}>
						{profile?.goals?.slice(-2).map((goal) => (
							<ObjectifCard
								key={goal.id}
								title={goal.title}
								description={goal.description ?? ''}
								progress={
									(goal.steps.filter(({ achieved }) => achieved).length || 1) /
									(goal.steps.length || 1)
								}
								startDate={goal.date_start ?? ''}
								endDate={goal.date_end ?? ''}
								onPress={() =>
									navigation.push('GoalDetailsScreen', { id: goal.id })
								}
							/>
						))}
					</View>
				</View>

				<View style={styles.containerobj}>
					<View style={styles.headerRow}>
						<Text style={styles.titletxt}>Mes exercices</Text>
						<Text
							style={styles.subtitletxt}
							onPress={() =>
								navigation.push('ExerciseListScreen', {
									filters: { profile_id: profileId },
								})
							}>
							Tout afficher
						</Text>
					</View>
					<View style={styles.containercard}>
						{profile?.exercises?.slice(-2).map((exercise) => (
							<View
								style={styles.itemCardContainer}
								key={exercise.id}>
								<ItemCard
									title={exercise.title}
									time={exercise.estimated_time_minutes ?? 0}
									categories={
										exercise.categories.map((categorie) => categorie.name) ?? []
									}
									pseudo={profile.pseudo ?? ''}
									onPressNav={() =>
										navigation.push('ExerciseDetailsScreen', {
											id: exercise.id,
										})
									}
								/>
							</View>
						))}
					</View>
				</View>

				<View style={styles.containerobj}>
					<View style={styles.headerRow}>
						<Text style={styles.titletxt}>Mes programmes</Text>
						<Text
							style={styles.subtitletxt}
							onPress={() =>
								navigation.push('ProgramListScreen', {
									filters: { profile_id: profileId },
								})
							}>
							Tout afficher
						</Text>
					</View>
					<View style={styles.containercard}>
						{profile?.programs?.slice(-2).map((program) => (
							<View
								style={styles.itemCardContainer}
								key={program.id}>
								<ItemCard
									title={program.title}
									description={program.description ?? ''}
									pseudo={profile.pseudo ?? ''}
									onPressNav={() =>
										navigation.push('ProgramDetailsScreen', { id: program.id })
									}
								/>
							</View>
						))}
					</View>
				</View>
				<View>
					<Text style={styles.discordTxt}>
						Besoin d'aide ? Rendez-vous sur notre <Text style={styles.lienTxt} onPress={() => Linking.openURL('https://discord.gg/SG4x8K7pf6')}>Discord</Text>
					</Text>
				</View>
			</ScrollView>
			<Portal.Host>
				<FabDashboard navigation={navigation} />
			</Portal.Host>
		</View>
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
	containercard: {
		flexDirection: 'column',
		marginTop: 20,
		marginBottom: 20,
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
	legendContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	legendItem: {
		flexDirection: 'row',
   
		alignItems: 'center',
		marginRight: 20,
		marginBottom: 10,
	},
	legendColor: {
		width: 20,
		height: 20,
		marginRight: 10,
		borderRadius: 5,
	},
	legendText: {
		fontSize: 12,
		color: theme.colors.text,
    fontWeight:'700',
	},
	noDataText: {
		color: theme.colors.textPlaceholder,
		fontSize: 16,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemCardContainer: {
		marginBottom: 10,
	},
  discordTxt: {
    color:theme.colors.textPlaceholder,
    textAlign:'center',
    marginTop: 10,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  lienTxt: {
    color:theme.colors.primary,
    textDecorationLine: 'underline',
  }
});

export default DashboardScreen;
