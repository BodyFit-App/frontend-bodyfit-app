import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Card, Text, Chip, IconButton } from 'react-native-paper';
import InputChip from '../InputChip/InputChip';
import theme from '../../theme';

/**
 * Propriétés pour le composant TrainingHeader
 * @typedef {Object} TrainingHeaderProps
 * @property {string} title - Le titre de l'entraînement.
 * @property {string} imageUrl - URL de l'image représentant l'entraînement.
 * @property {string} duration - Durée de l'entraînement (ex. : "40 min").
 * @property {string[]} categories - Liste des catégories/tags de l'entraînement.
 * @property {boolean} isFavorite - Indique si l'entraînement est marqué comme favori.
 * @property {() => void} onToggleFavorite - Fonction de rappel pour basculer l'état favori.
 */

/**
 * Composant affichant les informations d'un entraînement sous forme de carte.
 * @param {TrainingHeaderProps} props - Les propriétés pour le composant.
 * @returns {JSX.Element} Le composant carte affiché.
 */

interface TrainingHeaderProps {
	title: string;
	imageUrl: string;
	duration: string;
	categories: string[];
	isFavorite: boolean;
	onToggleFavorite: () => void;
}

const { width } = Dimensions.get('window');

const TrainingHeader: React.FC<TrainingHeaderProps> = ({
	title,
	imageUrl,
	duration,
	categories,
	isFavorite,
	onToggleFavorite,
}) => {
	return (
		<Card style={styles.card}>
			<Text style={styles.title}>{title}</Text>
			<Image
				source={{ uri: imageUrl }}
				style={styles.image}
				testID='training-image'
			/>
			<View style={styles.containerInfo}>
				<View>
					<Text style={styles.titleCat}>Catégorie</Text>
					<View style={styles.containerChip}>
						{categories.map((tag, index) => (
							<InputChip
								key={index}
								children={tag}
								style={styles.chip}
								textStyle={{ fontSize: 13, lineHeight: 15 }}
							/>
						))}
					</View>
				</View>
				<View>
					<View style={styles.containerDuration}>
						<IconButton
							style={{ padding: 0, margin: 0 }}
							icon='clock-outline'
							iconColor='#2F80ED'
							size={18}
						/>
						<Text style={styles.txtDuration}>{duration}</Text>
					</View>
					<View style={{ alignItems: 'flex-end' }}>
						<IconButton
							style={{ padding: 0, margin: 0 }}
							icon={isFavorite ? 'star' : 'star-outline'}
							iconColor={isFavorite ? '#2F80ED' : '#A0A0A0'}
							size={25}
							onPress={onToggleFavorite}
							testID='favorite-button'
						/>
					</View>
				</View>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 0,
		backgroundColor: '#161626',
		borderColor: theme.colors.border,
		borderBottomWidth: 1,
		borderTopWidth: 1,
		width: width,
		alignSelf: 'center',
	},
	containerInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
		alignItems: 'center',
    alignContent  : 'center',


	},
	containerChip: {
		flexDirection: 'row',
	},
	containerDuration: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 0,
		margin: 0,
	},
	txtDuration: {
		color: theme.colors.text,
		fontSize: 16,
	},

	titleCat: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 15,
    marginLeft: 5,
	},
	title: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 32,
		textAlign: 'left',
		padding: 16,
		marginVertical: 10,
		textTransform: 'uppercase',
	},
	image: {
		height: 250,
	},
	chip: {
		height: 30,
		marginRight: 5,
	},
});

export default TrainingHeader;
