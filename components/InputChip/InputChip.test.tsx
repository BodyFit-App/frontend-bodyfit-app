import React from 'react';
import { render } from '@testing-library/react-native';
import InputChip from './InputChip';
import { Icon } from 'react-native-paper';

describe('InputChip', () => {
	it('renders InputChip component correctly', () => {
		const { getByText } = render(<InputChip>Test Chip</InputChip>);
		expect(getByText('Test Chip')).toBeTruthy();
	  });
});
