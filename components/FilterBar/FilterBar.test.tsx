import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FilterBar from './FilterBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('FilterBar', () => {
  it('should render the correct number of results', () => {
    const { getByText } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );
    expect(getByText('10 résultats')).toBeTruthy();
  });

  it('should display the default filter option', () => {
    const { getByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );
    expect(getByTestId('filter-text').props.children).toBe('Plus récents');
  });

  it('should show the menu when the filter button is pressed', async () => {
    const { getByTestId, queryByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    // Le menu ne doit pas être visible au début
    expect(queryByTestId('menu-item-a-z')).toBeNull();

    // Simuler le clic sur le bouton de filtre
    fireEvent.press(getByTestId('filter-button'));

    // Attendre que le menu apparaisse
    await waitFor(() => {
      expect(getByTestId('menu-item-a-z')).toBeTruthy();
    });
  });

  it('should change the filter when an option is selected', async () => {
    const { getByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    // Ouvrir le menu
    fireEvent.press(getByTestId('filter-button'));

    // Attendre que le menu soit visible
    await waitFor(() => {
      expect(getByTestId('menu-item-z-a')).toBeTruthy();
    });

    // Sélectionner une option de filtre
    fireEvent.press(getByTestId('menu-item-z-a'));

    // Utiliser un léger délai pour laisser le temps à l'état de changer
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Vérifier que le texte du bouton de filtre a changé
    await waitFor(() => {
      expect(getByTestId('filter-text').props.children).toBe('Z-A');
    });
  });

  it('should change the filter to "Moins récents" when that option is selected', async () => {
    const { getByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    // Ouvrir le menu
    fireEvent.press(getByTestId('filter-button'));

    // Sélectionner "Moins récents"
    fireEvent.press(getByTestId('menu-item-moins-recents'));

    // Utiliser un léger délai pour laisser le temps à l'état de changer
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Vérifier que le texte du bouton de filtre a changé
    await waitFor(() => {
      expect(getByTestId('filter-text').props.children).toBe('Moins récents');
    });
  });

  it('should change the filter to "A-Z" when that option is selected', async () => {
    const { getByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    // Ouvrir le menu
    fireEvent.press(getByTestId('filter-button'));

    // Sélectionner "A-Z"
    fireEvent.press(getByTestId('menu-item-a-z'));

    // Utiliser un léger délai pour laisser le temps à l'état de changer
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Vérifier que le texte du bouton de filtre a changé
    await waitFor(() => {
      expect(getByTestId('filter-text').props.children).toBe('A-Z');
    });
  });

  it('should change the filter to "Z-A" when that option is selected', async () => {
    const { getByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    // Ouvrir le menu
    fireEvent.press(getByTestId('filter-button'));

    // Sélectionner "Z-A"
    fireEvent.press(getByTestId('menu-item-z-a'));

    // Utiliser un léger délai pour laisser le temps à l'état de changer
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Vérifier que le texte du bouton de filtre a changé
    await waitFor(() => {
      expect(getByTestId('filter-text').props.children).toBe('Z-A');
    });
  });
});
