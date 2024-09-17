import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, IconButton, Chip } from 'react-native-paper';
import InputChip from '../InputChip/InputChip';

interface ActivityCardProps {
	username: string;
	exerciseTitle: string;
	description?: string;
	tags: string[];
	duration: string;
	isFavorite: boolean;
	onToggleFavorite: () => void;
	onExercisePress?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
	username,
	exerciseTitle,
	description,
	tags,
	duration,
	isFavorite,
	onToggleFavorite,
	onExercisePress,
}) => {
	const visibleTags = tags.slice(0, 3);
	const remainingTagsCount = tags.length - visibleTags.length;
	const favorite = isFavorite ? 'star' : 'star-outline';
	const colorFavorite = isFavorite ? '#2F80ED' : '#A0A0A0';

	return (
		<Card style={styles.card}>
			<View style={styles.headerContainer}>
				<IconButton
					icon={favorite}
					iconColor={colorFavorite}
					size={25}
					onPress={onToggleFavorite}
					testID='favorite-button'
				/>
				<View style={styles.contentContainer}>
					<View style={styles.detailsContainer}>
						<Text style={styles.username}>@{username}</Text>
						<Text
							style={styles.exerciseTitle}
							onPress={onExercisePress}>
							{exerciseTitle}
						</Text>
						{description ? (
							<Text
								style={styles.description}
								numberOfLines={2}
								ellipsizeMode='tail'>
								{description}
							</Text>
						) : null}
						<View style={styles.tagContainer}>
							{visibleTags.map((tag, index) => (
								<InputChip
									textStyle={styles.chipText}
									style={styles.chip}
									key={index}>
									{tag}
								</InputChip>
							))}
							{remainingTagsCount > 0 && (
								<InputChip
									textStyle={styles.chipText}
									style={styles.chip}
									key={remainingTagsCount}>
									+ {remainingTagsCount} autres
								</InputChip>
							)}
						</View>
					</View>
					<View style={styles.durationContainer}>
						<IconButton
							icon='clock-outline'
							iconColor='#2F80ED'
							size={18}
						/>
						<Text style={styles.duration}>{duration}</Text>
					</View>
				</View>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#161626',
		marginBottom: 10,
		padding: 10,
		borderRadius: 10,
		borderColor: '#2F80ED',
		borderWidth: 2,
		flex: 1,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	detailsContainer: {
		flex: 1,
	},
	username: {
		color: '#2F80ED',
		fontWeight: 'bold',
	},
	exerciseTitle: {
		color: '#ffffff',
		fontSize: 16,
		marginTop: 5,
	},
	description: {
		color: '#ffffff',
		marginTop: 5,
		opacity: 0.8,
	},
	durationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: 80,
	},
	duration: {
		color: '#2F80ED',
		fontWeight: 'bold',
	},
	tagContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 5,
	},
	chip: {
		marginRight: 5,
		height: 30,
	},
	chipText: {
		lineHeight: 15,
		fontSize: 10,
	},
});

export default ActivityCard;
