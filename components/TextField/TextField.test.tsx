import React from 'react';
import { render } from '@testing-library/react-native';
import TextField from './TextField';
import theme from '../../theme';

describe('TextField Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <TextField placeholder="Enter text" />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
  });

  it('forwards props correctly', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField
        placeholder="Test onChange"
        onChangeText={mockOnChangeText}
        value="Hello"
      />
    );

    const input = getByPlaceholderText('Test onChange');
    expect(input.props.value).toBe('Hello');
    
    // Simule un changement de texte
    input.props.onChangeText('New text');
    expect(mockOnChangeText).toHaveBeenCalledWith('New text');
  });
});
