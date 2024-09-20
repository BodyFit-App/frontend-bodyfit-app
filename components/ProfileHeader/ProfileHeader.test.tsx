import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfilHeader from './ProfileHeader';

describe('ProfilHeader Component', () => {
  const mockEditProfile = jest.fn();
  const mockSignOutProfile = jest.fn();

  const defaultProps = {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    followers: 100,
    profileImage: 'https://example.com/image.jpg',
    exercisesCount: 10,
    programsCount: 5,
    goalsCount: 3,
    onEditProfile: mockEditProfile,
    onSignOutProfile: mockSignOutProfile
  };

  it('renders the user information correctly', () => {
    const { getByText, getByTestId } = render(<ProfilHeader {...defaultProps} />);
 
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('@johndoe')).toBeTruthy();
    expect(getByText('100 followers')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    expect(getByText('Exercices')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('Programmes')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('Objectifs')).toBeTruthy();
    expect(getByTestId('profile-image')).toBeTruthy();
  });
  
  it('renders the default image when profileImage is not provided', () => {
    const { getByTestId } = render(
      <ProfilHeader
        {...defaultProps}
        profileImage={undefined} 
      />
    );
  
    const image = getByTestId('profile-image');
    expect(image.props.source.uri).toBe('https://placekitten.com/200/200');
  });
  

  it('calls onEditProfile when the "Modifier le profil" button is pressed', () => {
    const { getByText } = render(<ProfilHeader {...defaultProps} />);

    fireEvent.press(getByText('Modifier le profil'));

    expect(mockEditProfile).toHaveBeenCalled();
  });

/*   it('calls onShareProfile when the "Partager le profil" button is pressed', () => {
    const { getByText } = render(<ProfilHeader {...defaultProps} />);

    fireEvent.press(getByText('Partager le profil'));

    expect(mockShareProfile).toHaveBeenCalled();
  }); */
});
