import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfilHeader from '../../components/ProfileHeader/ProfileHeader';
import theme from '../../theme';
import CustomButton from '../../components/CustomButton/CustomButton';
import PieChart from 'react-native-pie-chart';
import ObjectifCard from '../../components/ObjectifCard/ObjectifCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileById, fetchProgress } from '../../api/profiles';
import { fetchFollowingsByProfileId } from '../../api/followings';
import { getPublicUrl } from '../../lib/supabase';
import ItemCard from '../../components/ItemCard';
import { fetchPrograms } from '../../api/programs';
import OtherProfilHeader from '../../components/OtherProfileHeader/OtherProfileHeader';

const ProfilDetailScreen = () => {
	const navigation = useNavigation();
	const id = 10;

	const { data: profile } = useQuery({
		queryKey: ['profile', id],
		queryFn: () => fetchProfileById(id),
		enabled: !!id,
	});

	const { data: followers } = useQuery({
		queryKey: ['followers', id],
		queryFn: () => fetchFollowingsByProfileId(id, 2),
		enabled: !!id,
	});


	return (
		<ScrollView>
			<View style={styles.profilheader}>
				{profile && (
					<OtherProfilHeader
                        firstname={profile.firstname ?? ''}
                        lastname={profile.lastname ?? ''}
                        username={profile.pseudo ?? ''}
                        followers={followers?.length ?? 0}
                        profileImage={getPublicUrl('images', profile.avatar_url ?? '')}
                        exercisesCount={profile.exercises?.length ?? 0}
                        programsCount={profile.programs?.length ?? 0}
                        goalsCount={profile.goals?.length ?? 0}
                        followed={false}
                        onFollowToggle={() => console.log('Toggle Follow')}               
                    />
				)}
			</View>

			

			<View style={styles.containerobj}>
				<View style={styles.headerRow}>
					<Text style={styles.titletxt}>Ces objectifs</Text>
					<Text
						style={styles.subtitletxt}
						onPress={() => navigation.navigate('GoalsScreen' as never)}>
						Tout afficher
					</Text>
				</View>
				<View style={styles.containercard}>
					{profile?.goals?.slice(-2).map((goal) => (
						<ObjectifCard
							key={goal.id}
							title={goal.title}
							description={goal.description ?? ''}
							progress={goal.achieved ? 1 : 0}
							startDate={goal.date_start ?? ''}
							endDate={goal.date_end ?? ''}
						/>
					))}
				</View>
			</View>

			<View style={styles.containerobj}>
				<View style={styles.headerRow}>
					<Text style={styles.titletxt}>Ces exercices</Text>
					<Text
						style={styles.subtitletxt}
						onPress={() => navigation.navigate('ExercisesScreen' as never)}>
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
								time={exercise.estimated_time_seconds ?? 0}
								categories={
									exercise.categories.map((categorie) => categorie.name) ?? []
								}
								pseudo={profile.pseudo ?? ''}
								isFav={true}
								onPressFav={() => console.log('Toggle Favorite')}
								onPressNav={() => navigation.navigate('Exercise' as never)}
							/>
						</View>
					))}
				</View>
			</View>

			<View style={styles.containerobj}>
				<View style={styles.headerRow}>
					<Text style={styles.titletxt}>Ces programmes</Text>
					<Text
						style={styles.subtitletxt}
						onPress={() => navigation.navigate('ProgramsScreen' as never)}>
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
								isFav={true}
								onPressFav={() => console.log('Toggle Favorite')}
								onPressNav={() => console.log('Go to program')}
							/>
						</View>
					))}
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
	containercard: {
		flexDirection: 'column',
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
		fontSize: 14,
		color: theme.colors.text,
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
});

export default ProfilDetailScreen;
