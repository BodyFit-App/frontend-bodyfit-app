import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Searchbar, Menu, Divider, Text, IconButton } from "react-native-paper";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";

const ObjectifListScreen = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [resultsCount, setResultsCount] = useState("3"); 
  const [filter, setFilter] = useState("Plus récents"); 
  const [visibleMenu, setVisibleMenu] = useState(false); 

  const onSearchChange = (query: string) => setSearchQuery(query);

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const objectifs = [
    {
      title: "Perdre du poids",
      startDate: "07/02/2024",
      endDate: "07/03/2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis arcu eros consectetur adipiscing elit.",
      progress: 1,
    },
    {
      title: "Prendre un truc",
      startDate: "05/02/2024",
      endDate: "07/03/2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis arcu eros consectetur adipiscing elit.",
      progress: 0.5,
    },
    {
      title: "Manger plus d'hamsters",
      startDate: "08/02/2024",
      endDate: "07/03/2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis arcu eros consectetur adipiscing elit.",
      progress: 0.75,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Objectifs</Text>
      <Searchbar
        placeholder="Rechercher"
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#2F80ED"
        inputStyle={{ color: "#ffffff" }}
      />
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>{resultsCount} résultats</Text>
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.filterButton} onPress={openMenu}>
              <Text style={styles.filterButtonText}>{filter}</Text>
              <IconButton icon="chevron-down" size={18} iconColor="#A0A0A0" />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => setFilter("Plus récents")} title="Plus récents" />
          <Divider />
          <Menu.Item onPress={() => setFilter("Moins récents")} title="Moins récents" />
          <Menu.Item onPress={() => setFilter("A-Z")} title="A-Z" />
          <Menu.Item onPress={() => setFilter("Z-A")} title="Z-A" />
          <Menu.Item onPress={() => setFilter("Progression asc")} title="Progression Ascendant" />
          <Menu.Item onPress={() => setFilter("Progression desc")} title="Progression Descendant" />
        </Menu>
      </View>
      <ScrollView style={styles.scrollView}>
        {objectifs.map((objectif, index) => (
          <ObjectifCard
            key={index}
            title={objectif.title}
            startDate={objectif.startDate}
            endDate={objectif.endDate}
            description={objectif.description}
            progress={objectif.progress}
            onPress={() => console.log("Objectif sélectionné")}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b13",
    paddingHorizontal: 20,
  },
  title: {
    color: "#2F80ED",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  searchBar: {
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: "#161626",
    borderWidth: 2,
    borderColor: "#22283e",
  },
  filterContainer: {
    borderColor: "#22283e",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  filterText: {
    color: "#A0A0A0",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#2F80ED",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  filterButtonText: {
    color: "#2F80ED",
    marginRight: 5,
  },
  scrollView: {
    flex: 1,
  },
});

export default ObjectifListScreen;
