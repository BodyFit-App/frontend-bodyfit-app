import React from 'react';
import fs from 'fs';
import path from 'path';
import { render, fireEvent } from '@testing-library/react-native';
import MyTrainingCard from './MyTrainingCard';

const snapshotFile = path.join(__dirname, '__snapshots__', 'MyTrainingCard.test.tsx.snap');

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
  
  afterEach(() => {
    if (fs.existsSync(snapshotFile)) {
      fs.unlinkSync(snapshotFile);
    }
  });

  it('renders user information and exercise details correctly', () => {
    const { getByText } = render(<MyTrainingCard {...defaultProps} />);

    expect(getByText('@janedoe')).toBeTruthy();
    expect(getByText('Course à pied')).toBeTruthy();
    expect(getByText('40 min')).toBeTruthy();
  });

  it('renders the tags correctly', () => {
    const { getByText } = render(<MyTrainingCard {...defaultProps} />);

    expect(getByText('Cardio')).toBeTruthy();
    expect(getByText('Fessier')).toBeTruthy();
    expect(getByText('Quadriceps')).toBeTruthy();
    expect(getByText('+ 1 autres')).toBeTruthy();
  });

  it('calls onToggleFavorite when the favorite icon is pressed', () => {
    const { getByTestId } = render(<MyTrainingCard {...defaultProps} />);

    fireEvent.press(getByTestId('favorite-button'));

    expect(mockToggleFavorite).toHaveBeenCalled();
  });

  it('calls onExercisePress when the exercise title is pressed', () => {
    const { getByText } = render(<MyTrainingCard {...defaultProps} />);

    fireEvent.press(getByText('Course à pied'));

    expect(mockExercisePress).toHaveBeenCalled();
  });

  it('renders the correct icon when isFavorite is true or false', () => {
    const { toJSON, rerender } = render(<MyTrainingCard {...defaultProps} isFavorite={true} />);
    
    const jsonOutput = toJSON();
    expect(jsonOutput).toMatchSnapshot();
    
    rerender(<MyTrainingCard {...defaultProps} isFavorite={false} />);
    
    const newJsonOutput = toJSON();
    expect(newJsonOutput).toMatchSnapshot();
  }); 
});
