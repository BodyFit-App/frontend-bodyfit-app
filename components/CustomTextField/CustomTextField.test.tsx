import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextField from './CustomTextField';

jest.useFakeTimers()

describe('CustomTextField', () => {
  it('devrait appeler onChangeText avec la nouvelle valeur lorsque le texte change', () => {
    const onChangeTextMock = jest.fn();
    const { getByTestId } = render(
      <CustomTextField
        label="Pseudo"
        value=""
        onChangeText={onChangeTextMock}
      />
    );

    const input = getByTestId('custom-text-field');
    fireEvent.changeText(input, 'Nouveau texte');

    expect(onChangeTextMock).toHaveBeenCalledWith('Nouveau texte');
  });
});