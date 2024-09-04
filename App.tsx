import React from "react";

import { PaperProvider } from "react-native-paper";
import Screens from "./screens";
import theme from "./theme";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigationComponent from './components/BottomNavigation/BottomNavigation';


export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Screens />
        </SafeAreaView>
        <NavigationContainer>
          <BottomNavigationComponent />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
