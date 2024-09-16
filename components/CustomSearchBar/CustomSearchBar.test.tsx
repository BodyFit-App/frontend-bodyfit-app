import React from 'react';
import { render } from '@testing-library/react-native';
import CustomSearchBar from './CustomSearchBar';
import theme from '../../theme';

describe('CustomSearchBar', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <CustomSearchBar placeholder="Search" value="" />
    );

    // Vérifier que le Searchbar est affiché avec le placeholder
    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('renders with custom styles passed as props', () => {
    const customStyle = { borderRadius: 20 };
    const { getByPlaceholderText } = render(
      <CustomSearchBar placeholder="Search" value="" style={customStyle} />
    );

    const searchBar = getByPlaceholderText('Search');
    
    expect(searchBar.props.style).toMatchObject([
      { 
        alignSelf: 'stretch',
        flex: 1,
        fontSize: 18,
        minWidth: 0,
        paddingLeft: 8,
        textAlign: 'left',
      },
      {
        color: 'rgba(73, 69, 79, 1)',
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.15,
        lineHeight: 0,
      },
      {
        minHeight: 56,
        paddingLeft: 0,
      },
      {
        alignSelf: 'center',
        fontSize: 16,
      },
    ]);
  });

  it('accepts and triggers onChangeText', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomSearchBar placeholder="Search" value="" onChangeText={mockOnChangeText} />
    );

    const searchBar = getByPlaceholderText('Search');

    // Simuler un changement de texte
    searchBar.props.onChangeText('new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });
});
