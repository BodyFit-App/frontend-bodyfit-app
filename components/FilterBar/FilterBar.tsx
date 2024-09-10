import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
	Text,
	Menu,
	Divider,
	IconButton,
} from 'react-native-paper';
import theme from '../../theme';

const FilterBar = () => {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const [filter, setFilter] = useState('Plus récents');

	const openMenu = () => setVisibleMenu(true);

	const closeMenu = () => setVisibleMenu(false);

	const resultsCount = 10;

	return (
		<View style={styles.container}>
			<Text style={styles.textColor}>{resultsCount} résultats</Text>
			<Menu
				visible={visibleMenu}
				onDismiss={closeMenu}
				anchor={
					<TouchableOpacity
						style={styles.filterButton}
						onPress={openMenu}>
						<Text style={styles.filterButtonText}>{filter}</Text>
						<IconButton
							icon='chevron-down'
							size={18}
							iconColor={theme.colors.primary}
						/>
					</TouchableOpacity>
				}>
				<Menu.Item
					onPress={() => setFilter('Plus récents')}
					title='Plus récents'
				/>
				<Divider />
				<Menu.Item
					onPress={() => setFilter('Moins récents')}
					title='Moins récents'
				/>
				<Menu.Item
					onPress={() => setFilter('A-Z')}
					title='A-Z'
				/>
				<Menu.Item
					onPress={() => setFilter('Z-A')}
					title='Z-A'
				/>
			</Menu>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: theme.colors.backgroundButton,
		borderColor: '#42424D',
		borderWidth: 1,
		borderRadius: 10,
		width: '90%',
	},
	textColor: {
		color: theme.colors.primary,
		marginLeft: 15,
	},
	filterButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	filterButtonText: {
		color: theme.colors.primary,
	},
});

export default FilterBar;
