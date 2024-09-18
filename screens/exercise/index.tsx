import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
import { fetchExerciseById } from '../../api/exercises';
import { MD2Colors, Text } from 'react-native-paper';
import { useParams } from 'react-router-native';
import TrainingHeader from '../../components/TrainingHeader/TrainingHeader';
import { getPublicUrl } from '../../lib/supabase';
import CreatorCard from '../../components/CreatorCard';
import { fetchProfileById } from '../../api/profiles';

export const ExerciseScreen = () => {
	const id = 47;

	const { data, error, isLoading } = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => fetchExerciseById(+id!),
	});

	if (isLoading)
		return (
			<ActivityIndicator
				animating={true}
				color={MD2Colors.red800}
			/>
		);

	if (error) return <Text>{error.message}</Text>;

	return (
		<ScrollView>
			<View>
				<TrainingHeader
					title={data?.title || ''}
					imageUrl={getPublicUrl('images', data?.banner_image ?? '')}
					duration={`${data?.estimated_time_seconds} min`}
					categories={data?.categories.map((c) => c.name) || []}
					isFavorite={false}
					onToggleFavorite={() => {}}
				/>
			</View>
			<View style={styles.containertxt}>
				<Text style={styles.txtdescription}>{data?.description}</Text>
			</View>
      <View>
        <CreatorCard 
		  firstname={data?.profiles?.firstname || ''}
          lastname={data?.profiles?.lastname || ''}
          pseudo={data?.profiles?.pseudo || ''}
          avatarUrl={getPublicUrl('images', data?.profiles?.avatar_url ?? '')}
        />
      </View>
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
});
