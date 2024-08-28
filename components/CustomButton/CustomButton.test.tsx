import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from './CustomButton';

describe('CustomButton', () => {

  it('doit rendre correctement le bouton par défaut', () => {
    const { toJSON } = render(
      <CustomButton title="Connexion" onPress={() => {}} buttonType="default" />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('doit rendre correctement le bouton en surbrillance', () => {
    const { toJSON } = render(
      <CustomButton title="Inscription" onPress={() => {}} buttonType="highlighted" />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('doit rendre correctement le bouton désactivé', () => {
    const { toJSON } = render(
      <CustomButton title="Inscription" onPress={() => {}} buttonType="disabled" />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('doit appeler la fonction onPress lorsque le bouton est cliqué', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Connexion" onPress={onPressMock} />
    );
    fireEvent.press(getByText('Connexion'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('ne doit pas appeler la fonction onPress lorsque le bouton est désactivé', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Connexion" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByText('Connexion'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('doit appliquer les styles corrects pour le type de bouton', () => {
    const { getByText } = render(
      <CustomButton title="Inscription" onPress={() => {}} buttonType="highlighted" />
    );
    const button = getByText('Inscription').parent;
    expect(button.props.style.backgroundColor).toBe('#2F80ED');
  });

});
