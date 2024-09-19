import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
import { fetchExerciseById } from '../../api/exercises';
import { Divider, MD2Colors, Text } from 'react-native-paper';
import { useParams } from 'react-router-native';
import TrainingHeader from '../../components/TrainingHeader/TrainingHeader';
import { getPublicUrl } from '../../lib/supabase';
import CreatorCard from '../../components/CreatorCard';
import { fetchProgramById } from '../../api/programs';
import ItemCard from '../../components/ItemCard';

export const ProgramScreen = () => {
	const id = 12;

	const { data } = useQuery({
		queryKey: ['program', id],
		queryFn: () => fetchProgramById(id),
	});




	return (
		<ScrollView>
			<View>
				<TrainingHeader
					title={data?.title || ''}
					imageUrl={getPublicUrl(
						'images',
						data?.sessions[0]?.exercises[1]?.banner_image || ''
					)}
					duration={(
						data?.sessions.reduce(
							(acc, session) =>
								acc +
								session.exercises.reduce(
									(exAcc, exercise) =>
										exAcc + (exercise.estimated_time_seconds || 0),
									0
								),
							0
						) || 0
					).toString()}
					categories={
						data?.sessions.flatMap((session) =>
							session.exercises.flatMap((exercise) =>
								exercise.categories.map((category) => category.name)
							)
						) || []
					}
					onToggleFavorite={() => {}}
          isFavorite={false}
				/>
			</View>
			<View style={styles.containertxt}>
        <Text style={styles.title}>Description</Text>
        <Divider style={{height: 1, marginBottom: 20}}/>
				<Text style={styles.txtdescription}>{data?.description}</Text>
			</View>
      <View style={styles.containertxt}>
        <Text style={styles.title}>Exercices associés</Text>
        <Divider style={{height: 1, marginBottom: 20}}/>
        
          {data?.sessions.flatMap((session) =>
            session.exercises.map((exercise) => (
              <View style={styles.itemCardContainer}>
              <ItemCard
                key={exercise.id}
                title={exercise.title}
                time={exercise.estimated_time_seconds ?? 0}
                categories={exercise.categories.map((categorie) => categorie.name) ?? []}
                pseudo={data?.profiles?.pseudo || ''}
                isFav={true}
  
                onPressFav={() => console.log('Toggle Favorite')}
                onPressNav={() => console.log('Go to exercise')}
              />
              </View>
            ))
          )}
       
      </View>
      <View style={styles.containertxt}>
        <Text style={styles.title}>Créateur</Text>
        <Divider style={{height: 1}}/>
        </View>
				<CreatorCard
					firstname={data?.profiles?.firstname || ''}
					lastname={data?.profiles?.lastname || ''}
					pseudo={data?.profiles?.pseudo || ''}
					avatarUrl={getPublicUrl('images', data?.profiles?.avatar_url ?? '')}
				/>
		
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	containertxt: {
		padding: 16,
	},
	txtdescription: {
		fontSize: 20,
	},
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemCardContainer: {
    marginBottom: 15,
  },
});
