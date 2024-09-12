import React from 'react';
import { StyleSheet } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import { DatePickerInputProps } from 'react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared';
import theme from '../../theme';

export default function CustomDatePicker({
	children,
	testID = 'date-picker',
	style = {},
	...props
}: DatePickerInputProps) {
	return (
		<DatePickerInput
			testID='date-picker'
			mode='outlined'
			style={styles.datePickerInput}
			iconColor='#2F80ED'
			outlineColor={theme.colors.primary}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	datePickerInput: {
		flexDirection: 'row',
		borderRadius: 10,
		backgroundColor: theme.colors.backgroundButton,
		borderColor: theme.colors.primary,
		color: theme.colors.primary,
	},
});
