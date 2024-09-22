import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ProfileFormScreen } from "./";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { fetchProfileById, updateProfile } from "../../api/profiles";
import { uploadImage } from "../../buckets/images";
import { Alert } from "react-native";

// Mock react-query hooks
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

// Mock useAuth hook
jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

// Mock API calls
jest.mock("../../api/profiles", () => ({
  fetchProfileById: jest.fn(),
  updateProfile: jest.fn(),
}));

// Mock upload image
jest.mock("../../buckets/images", () => ({
  uploadImage: jest.fn(),
}));

// Mock TextField component
jest.mock("../../components/TextField/TextField", () => {
  const { TextInput } = jest.requireActual("react-native");
  return (props) => (
    <TextInput
      testID={props.testID}
      value={props.value}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
    />
  );
});

// Mock ImagePicker component
jest.mock("../../components/ImagePicker/ImagePicker", () => {
  const { Button, View } = jest.requireActual("react-native");
  return (props) => (
    <View testID="image-picker">
      <Button title="Pick Image" onPress={() => props.onChange("image-url")} />
    </View>
  );
});

describe("ProfileFormScreen", () => {
  const mockNavigation = { goBack: jest.fn() };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  beforeEach(() => {
    // Mock useQueryClient to return the mockQueryClient
    useQueryClient.mockReturnValue(mockQueryClient);

    // Mock updateProfile mutation function
    useMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    // Mock fetchProfileById query
    useQuery.mockReturnValue({
      data: {
        id: 1,
        pseudo: "TestUser",
        firstname: "John",
        lastname: "Doe",
        avatar_url: "image-url",
      },
      isSuccess: true,
      isLoading: false,
    });

    // Mock useAuth to return session data
    useAuth.mockReturnValue({
      session: {
        user: { id: "test-user-id", user_metadata: { profile_id: 1 } },
      },
      deleteAccount: jest.fn(),
    });

    jest.spyOn(Alert, "alert");
  });

  it("renders the form with all input fields", () => {
    const { getByTestId } = render(
      <ProfileFormScreen navigation={mockNavigation} route={{ params: {} }} />
    );

    // Check that input fields are rendered
    expect(getByTestId("pseudo")).toBeTruthy();
    expect(getByTestId("firstname")).toBeTruthy();
    expect(getByTestId("lastname")).toBeTruthy();
    expect(getByTestId("image-picker")).toBeTruthy();
  });

  it("loads the profile data correctly in edit mode", async () => {
    const { getByTestId } = render(
      <ProfileFormScreen navigation={mockNavigation} route={{ params: {} }} />
    );

    await waitFor(() => {
      expect(getByTestId("pseudo").props.value).toBe("TestUser");
      expect(getByTestId("firstname").props.value).toBe("John");
      expect(getByTestId("lastname").props.value).toBe("Doe");
    });
  });

  it("submits the form and calls the update mutation", async () => {
    const mockMutate = jest.fn();
    useMutation.mockReturnValue({ mutate: mockMutate });

    const { getByTestId } = render(
      <ProfileFormScreen navigation={mockNavigation} route={{ params: {} }} />
    );

    // Fill out the form
    fireEvent.changeText(getByTestId("pseudo"), "UpdatedUser");
    fireEvent.changeText(getByTestId("firstname"), "Jane");
    fireEvent.changeText(getByTestId("lastname"), "Doe");

    // Submit the form
    fireEvent.press(getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          pseudo: "UpdatedUser",
          firstname: "Jane",
          lastname: "Doe",
        })
      );
    });
  });

  it("calls deleteAccount when deleting the profile", async () => {
    const mockDeleteAccount = useAuth().deleteAccount;

    const { getByTestId } = render(
      <ProfileFormScreen navigation={mockNavigation} route={{ params: {} }} />
    );

    // Simulate pressing the delete profile button
    fireEvent.press(getByTestId("delete-button"));

    // Simulate the alert dialog and press "Supprimer"
    expect(Alert.alert).toHaveBeenCalledWith(
      "Supprimer le profil",
      "Êtes-vous sûr de vouloir supprimer votre profil ?",
      expect.any(Array)
    );

    // Simulate pressing the "Supprimer" button in the alert
    const alertButtons = Alert.alert.mock.calls[0][2];
    const deleteButton = alertButtons.find(
      (button) => button.text === "Supprimer"
    );

    // Press the "Supprimer" button
    deleteButton.onPress();

    await waitFor(() => {
      expect(mockDeleteAccount).toHaveBeenCalledTimes(1);
    });
  });
});
