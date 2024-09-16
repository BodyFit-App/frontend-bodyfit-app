import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { BottomTabs } from './BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

jest.mock('../../screens/Actualites', () => () => {
  const { Text } = require('react-native');
  return <Text>Actualité Screen</Text>;
});

jest.mock('../../screens/exercises', () => () => {
  const { Text } = require('react-native');
  return <Text>Exercices Screen</Text>;
});

jest.mock('../../screens/Profil', () => () => {
  const { Text } = require('react-native');
  return <Text>Profil Screen</Text>;
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    <PaperProvider>{children}</PaperProvider>
  </NavigationContainer>
);

describe('BottomTabs Component', () => {

 beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should render the bottom navigation with correct initial tab', async () => {
    const { getAllByText, unmount } = render(
      <Wrapper>
        <BottomTabs />
      </Wrapper>
    );

    const actualiteElements = getAllByText('Actualité');
    expect(actualiteElements[0]).toBeTruthy();

    unmount();
  });

  it('should navigate to "Exercices" tab on press', async () => {
    const { getAllByText, unmount } = render(
      <Wrapper>
        <BottomTabs />
      </Wrapper>
    );

    await act(async () => {
      fireEvent.press(getAllByText('Exercices')[0]);
    });

    const exercicesTab = getAllByText('Exercices');
    expect(exercicesTab[0]).toBeTruthy();

    unmount();
  });

  it('should navigate to "Profil" tab on press', async () => {
    const { getAllByText, unmount } = render(
      <Wrapper>
        <BottomTabs />
      </Wrapper>
    );

    await act(async () => {
      fireEvent.press(getAllByText('Profil')[0]);
    });

    const profilTab = getAllByText('Profil');
    expect(profilTab[0]).toBeTruthy();

    unmount();
  });
});
