import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyTrainingCard from './MyTrainingCard'; // Assurez-vous que le chemin est correct

describe('MyTrainingCard Component', () => {
  const mockToggleFavorite = jest.fn();
  const mockExercisePress = jest.fn();

  const defaultProps = {
    username: 'janedoe',
    exerciseTitle: 'Course à pied',
    tags: ['Cardio', 'Fessier', 'Quadriceps', 'Endurance'],
    duration: '40 min',
    isFavorite: true,
    onToggleFavorite: mockToggleFavorite,
    onExercisePress: mockExercisePress,
  };
  
  it('renders user information and exercise details correctly', () => {
    const { getByText } = render(<MyTrainingCard {...defaultProps} />);

    // Vérifie l'affichage du nom d'utilisateur, du titre de l'exercice, et de la durée
    expect(getByText('@janedoe')).toBeTruthy();
    expect(getByText('Course à pied')).toBeTruthy();
    expect(getByText('40 min')).toBeTruthy();
  });

  it('renders the tags correctly', () => {
    const { getByText } = render(<MyTrainingCard {...defaultProps} />);

    // Vérifie l'affichage des trois premiers tags
    expect(getByText('Cardio')).toBeTruthy();
    expect(getByText('Fessier')).toBeTruthy();
    expect(getByText('Quadriceps')).toBeTruthy();

    // Vérifie que le tag supplémentaire est affiché si nécessaire
    expect(getByText('+ 1 autres')).toBeTruthy();
  });

  it('calls onToggleFavorite when the favorite icon is pressed', () => {
    const { getByTestId } = render(<MyTrainingCard {...defaultProps} />);

    // Simule l'appui sur l'icône de favoris
    fireEvent.press(getByTestId('favorite-button'));

    // Vérifie que la fonction onToggleFavorite est appelée
    expect(mockToggleFavorite).toHaveBeenCalled();
  });

  it('calls onExercisePress when the exercise title is pressed', () => {
    const { getByText } = render(<MyTrainingCard {...defaultProps} />);

    // Simule l'appui sur le titre de l'exercice
    fireEvent.press(getByText('Course à pied'));

    // Vérifie que la fonction onExercisePress est appelée
    expect(mockExercisePress).toHaveBeenCalled();
  });

  it('renders the correct icon when isFavorite is true or false', () => {
    const { getByTestId, rerender } = render(<MyTrainingCard {...defaultProps} isFavorite={true} />);
  
    // Vérifie que l'icône de favoris est affichée (étoile pleine)
    const favoriteIcon = getByTestId('favorite-button');
    expect(favoriteIcon.props.name).toBe('star'); // Adjust the icon name based on your icon library
  
    // Re-rendre le composant avec isFavorite à false
    rerender(<MyTrainingCard {...defaultProps} isFavorite={false} />);
  
    // Vérifie que l'icône de favoris est changée (étoile vide)
    const updatedFavoriteIcon = getByTestId('favorite-button');
    expect(updatedFavoriteIcon.props.name).toBe('star-outline'); // Adjust the icon name based on your icon library
  });
  
   
});
