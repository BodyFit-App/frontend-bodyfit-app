import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Menu, Divider, IconButton } from "react-native-paper";
import theme from "../../theme";

/**
 * Propriétés pour le composant `FilterBar`.
 *
 * @typedef {Object} FilterBarProps
 * @property {string[]} [filters] - Liste des filtres disponibles (optionnel).
 * @property {string} [defaultFilter] - Filtre par défaut sélectionné (optionnel).
 * @property {number} [resultsCount] - Nombre de résultats à afficher (optionnel).
 * @property {function} [onFilterChange] - Fonction appelée lorsque le filtre sélectionné change (optionnel).
 */

/**
 * `FilterBar` est un composant réutilisable qui affiche un menu de filtres et permet à l'utilisateur
 * de changer le filtre sélectionné. Il est personnalisable en passant une liste de filtres,
 * un filtre par défaut et une fonction de rappel lorsque le filtre change.
 *
 * @param {FilterBarProps} props - Les propriétés passées au composant `FilterBar`.
 * @returns {JSX.Element} Le composant `FilterBar`.
 */

interface FilterBarProps {
  filters?: string[];  
  defaultFilter?: string;  
  resultsCount?: number;  
  onFilterChange?: (selectedFilter: string) => void; 
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters = ["Plus récents", "Moins récents", "A-Z", "Z-A"], 
  defaultFilter = "Plus récents",
  resultsCount = 0,
  onFilterChange = () => {}
}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [filter, setFilter] = useState(defaultFilter);

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

   /**
   * Gère la sélection d'un filtre.
   * Met à jour le filtre affiché et déclenche la fonction de rappel `onFilterChange`.
   *
   * @param {string} selectedFilter - Le filtre sélectionné.
   */
  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);  
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>{resultsCount} résultats</Text>
      <Menu
        visible={visibleMenu}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            style={styles.filterButton}
            onPress={openMenu}
            testID="filter-button"
          >
            <Text style={styles.filterButtonText} testID="filter-text">{filter}</Text>
            <IconButton
              icon='chevron-down'
              size={18}
              iconColor={theme.colors.primary}
              testID="filter-icon"
            />
          </TouchableOpacity>
        }
      >
        {filters.map((filterOption, index) => (
          <Menu.Item
            key={index}
            onPress={() => handleFilterChange(filterOption)}
            title={filterOption}
            testID={`menu-item-${filterOption.replace(/\s+/g, '-').toLowerCase()}`}
          />
        ))}
        <Divider />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundButton,
    borderColor: "#42424D",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
  },
  textColor: {
    color: theme.colors.primary,
    marginLeft: 15,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonText: {
    color: theme.colors.primary,
  },
});

export default FilterBar;
