import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ObjectifCard from './ObjectifCard';

describe('ObjectifCard', () => {

  beforeAll(() => {
    jest.useFakeTimers();
  })
  const defaultProps = {
    title: 'Perte de poids',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    description: 'Objectif de perte de poids pour l\'année 2024.',
    progress: 0.4,
    onPress: jest.fn(),
  };

  it('renders correctly with given props', () => {
    const { getByText } = render(<ObjectifCard {...defaultProps} />);
    
    expect(getByText('Perte de poids')).toBeTruthy();
    expect(getByText('Du 01/01/2024 au 31/12/2024')).toBeTruthy();
    expect(getByText('Objectif de perte de poids pour l\'année 2024.')).toBeTruthy();
    expect(getByText('40%')).toBeTruthy();
  });

  it('calls onPress when card is pressed', async () => {
    const { getByTestId } = render(<ObjectifCard {...defaultProps} />);

    await act(async () => {
      fireEvent.press(getByTestId('objectif-card'));
    });

    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it('displays "Dates à définir" when dates are not provided', () => {
    const props = { ...defaultProps, startDate: undefined, endDate: undefined };
    const { getByText } = render(<ObjectifCard {...props} />);
    
    expect(getByText('Dates à définir')).toBeTruthy();
  });

  it('displays truncated description if it is too long', () => {
    const longDescription = 'A'.repeat(101);
    const props = { ...defaultProps, description: longDescription };
    const { getByText } = render(<ObjectifCard {...props} />);
    
    expect(getByText(`${longDescription.substring(0, 100)}...`)).toBeTruthy();
  });

  it('displays "Sans description" if description is not provided', () => {
    const props = { ...defaultProps, description: undefined };
    const { getByText } = render(<ObjectifCard {...props} />);
    
    expect(getByText('Sans description')).toBeTruthy();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
