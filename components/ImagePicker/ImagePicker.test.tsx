import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ImagePicker from "./";
import * as ImageManipulator from "expo-image-manipulator";
import * as ExpoImagePicker from "expo-image-picker";
import { Alert } from "react-native";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: "mock-uri" }],
  }),
  MediaTypeOptions: {
    Images: "Images",
  },
  requestMediaLibraryPermissionsAsync: jest.fn(),
}));

jest.mock("expo-file-system", () => ({
  readAsStringAsync: jest.fn().mockResolvedValue("base64-string"),
}));

jest.mock("expo-image-manipulator", () => ({
  manipulateAsync: jest.fn().mockResolvedValue({ uri: "resized-uri" }),
  SaveFormat: {
    JPEG: "JPEG",
    PNG: "PNG",
  },
}));

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("ImagePicker", () => {
  it("should call Alert.alert if permissions are not granted", async () => {
    (
      ExpoImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValue({
      status: "denied",
    });

    const { getByTestId } = render(
      <ImagePicker value={null} onChange={() => {}} />
    );

    fireEvent.press(getByTestId("image-picker"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Permission refusée",
        "Désolé, nous avons besoin de la permission pour accéder à vos photos."
      );
    });
  });

  it("should handle case where result is canceled", async () => {
    (
      ExpoImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValue({
      status: "granted",
    });

    const launchImageLibraryAsyncMock =
      ExpoImagePicker.launchImageLibraryAsync as jest.Mock;
    launchImageLibraryAsyncMock.mockResolvedValue({
      canceled: true,
    });

    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <ImagePicker value={null} onChange={onChangeMock} />
    );

    fireEvent.press(getByTestId("image-picker"));

    await waitFor(() => {
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });

  it("should call manipulateAsync and onChange with the resized URI", async () => {
    (
      ExpoImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
    ).mockResolvedValue({
      status: "granted",
    });

    const launchImageLibraryAsyncMock =
      ExpoImagePicker.launchImageLibraryAsync as jest.Mock;
    launchImageLibraryAsyncMock.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "mock-uri" }],
    });

    const manipulateAsyncMock = ImageManipulator.manipulateAsync as jest.Mock;
    manipulateAsyncMock.mockResolvedValue({ uri: "resized-uri" });

    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <ImagePicker value={null} onChange={onChangeMock} />
    );

    fireEvent.press(getByTestId("image-picker"));

    await waitFor(() => {
      expect(manipulateAsyncMock).toHaveBeenCalledWith(
        "mock-uri",
        [{ resize: { width: 300, height: 225 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      expect(onChangeMock).toHaveBeenCalledWith("resized-uri");
    });
  });
});
