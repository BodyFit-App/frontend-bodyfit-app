import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActuCard from './ActuCard';
describe('ActuCard', () => {
  const mockProps = {
    username: 'john_doe',
    fullName: 'John Doe',
    profileImageUrl: 'https://example.com/john.jpg',
    actionDescription: 'created a new exercise',
    exerciseLinkText: 'Check out this new exercise',
    onExercisePress: jest.fn(),
    onUsernamePress: jest.fn(),
  };

  it('renders the basic information correctly', () => {
    const { getByText } = render(<ActuCard {...mockProps} />);

  
    expect(getByText('John Doe @john_doe')).toBeTruthy();
    expect(getByText('@john_doe')).toBeTruthy();

 
    expect(getByText('created a new exercise Check out this ...')).toBeTruthy();


    expect(getByText('Check out this ...')).toBeTruthy();
  });

  it('calls onUsernamePress when the username is pressed', () => {
    const { getByText } = render(<ActuCard {...mockProps} />);

    
    fireEvent.press(getByText('@john_doe'));

   
    expect(mockProps.onUsernamePress).toHaveBeenCalled();
  });

  it('calls onExercisePress when the exercise link is pressed', () => {
    const { getByText } = render(<ActuCard {...mockProps} />);

  
    fireEvent.press(getByText('Check out this ...'));

    
    expect(mockProps.onExercisePress).toHaveBeenCalled();
  });

  it('renders the default avatar when no profileImageUrl is provided', () => {
    const { getByTestId } = render(
      <ActuCard {...mockProps} profileImageUrl={undefined} />
    );


    expect(getByTestId('default-avatar')).toBeTruthy();
  });

  it('renders the profile image when profileImageUrl is provided', () => {
    const { getByTestId } = render(<ActuCard {...mockProps} />);


    expect(getByTestId('profile-image')).toBeTruthy();
  });
  
  it('truncates the text when its length exceeds the max length', () => {
    const longTextProps = {
      ...mockProps,
      exerciseLinkText: 'This is a very long text that should be truncated',
    };
  
    const { getByText } = render(<ActuCard {...longTextProps} />);
  
    expect(getByText('This is a very ...')).toBeTruthy();
  });
  
  it('does not truncate the text when its length is less than or equal to the max length', () => {
    const shortTextProps = {
      ...mockProps,
      exerciseLinkText: 'Short text',
    };
  
    const { getByText } = render(<ActuCard {...shortTextProps} />);
  
    expect(getByText('Short text')).toBeTruthy();
  });
  
});
