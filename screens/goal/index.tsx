import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';

import { Divider, MD2Colors, Text } from 'react-native-paper';

import { getPublicUrl } from '../../lib/supabase';
import CreatorCard from '../../components/CreatorCard';

import GoalHeader from '../../components/GoalHeader';
import { fetchGoalById } from '../../api/goals';
import StepCard from '../../components/StepCard/StepCard';

export const GoalScreen = () => {
	const id = 8;

	const { data } = useQuery({
		queryKey: ['goal', id],
		queryFn: () => fetchGoalById(+id!),
	});

	return (
		<ScrollView>
			<View>
				<GoalHeader
					title={data?.title || ''}
					imageUrl={getPublicUrl('images', data?.banner_image ?? '')}
					startDate={new Date(data?.date_start ?? '')}
					endDate={new Date(data?.date_end ?? '')}
					progress={
						data?.steps && data.steps.length > 0
							? data.steps.filter((step) => step.achieved).length /
							  data.steps.length
							: 0
					}
				/>
			</View>
			<View style={styles.containertxt}>
				<Text style={styles.title}>Description</Text>
				<Divider style={{ height: 1, marginBottom: 20 }} />
				<Text style={styles.txtdescription}>{data?.description}</Text>
			</View>
			<View style={styles.containertxt}>
				<Text style={styles.title}>Les étapes</Text>
				<Divider style={{ height: 1, marginBottom: 20 }} />
				{data?.steps?.map((step, index) => (
					<View
						key={step.id}
						style={styles.containerCard}>
						<StepCard
							stepNumber={index + 1}
							totalSteps={data.steps.length}
							description={step.description ?? ''}
							isEditable={false}
							isValidated={step.achieved}
						/>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	containertxt: {
		padding: 16,
	},
	containerCard: {
		flex: 1,
	},
	txtdescription: {
		fontSize: 20,
	},
	title: {
		fontSize: 25,
		fontWeight: '600',
		marginBottom: 10,
	},
});
