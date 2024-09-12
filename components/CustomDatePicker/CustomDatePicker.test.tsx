import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CustomDatePicker from './CustomDatePicker';

describe('CustomDatePicker', () => {
	it('renders correctly with default props', () => {
		const { getByTestId } = render(
			<CustomDatePicker
				value={new Date()}
				onChange={() => {}}
				locale='fr'
				inputMode='start'
			/>
		);
		const datePicker = getByTestId('date-picker');

		// Vérifie si le DatePicker est rendu
		expect(datePicker).toBeTruthy();
	});

	it('passes custom props to the DatePickerInput', () => {
		const customDate = new Date(2023, 8, 12); // 12 septembre 2023
		const mockOnPress = jest.fn(); // Mock function pour tester onChange

		const { getByTestId } = render(
			<CustomDatePicker
				value={customDate}
				inputMode='start'
				locale='fr'
                onChange={() => {}}
                onPress={mockOnPress}
			/>
		);

		const datePicker = getByTestId('date-picker');

		// Vérifie que la valeur formatée est correcte
		expect(datePicker.props.value).toBe('12/09/2023');

        fireEvent.press(datePicker);
        expect(mockOnPress).toHaveBeenCalled();


	});
});
