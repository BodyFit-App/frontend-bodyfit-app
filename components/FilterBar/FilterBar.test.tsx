import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper'; // Import du Provider de react-native-paper
import FilterBar from './FilterBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('FilterBar', () => {
  // Test du rendu initial
  it('should render the correct number of results', () => {
    const { getByText } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );
    expect(getByText('10 résultats')).toBeTruthy();
  });

  it('should display the default filter option', () => {
    const { getByText } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );
    expect(getByText('Plus récents')).toBeTruthy();
  });

  // Test de l'affichage du menu
  it('should show the menu when the filter button is pressed', () => {
    const { getByText, queryByText } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    // Le menu ne doit pas être visible au début
    expect(queryByText('A-Z')).toBeNull();

    // Simuler le clic sur le bouton
    fireEvent.press(getByText('Plus récents'));

    // Maintenant, le menu doit être visible
    expect(getByText('A-Z')).toBeTruthy();
  });

  // Test de l'état initial
  it('should have the initial state with the default filter', () => {
    const { getByText } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );
    expect(getByText('Plus récents')).toBeTruthy();
  });
});
