import useAvatarUpload from "../hooks/useAvatarUpload";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { act, renderHook } from "@testing-library/react-native";

// Mock pour Expo Image Picker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: "mock-uri" }],
  }),
  MediaTypeOptions: {
    Images: "Images",
  },
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
describe("useAvatarUpload hook", () => {
  it("should pick and upload image", async () => {
    const { result } = renderHook(() => useAvatarUpload());

    await act(async () => {
      await result.current.pickImage();
      await result.current.handleUpload();
    });
    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    expect(result.current.image?.uri).toBe("resized-uri");
  });
});
