import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadAvatar } from "../buckets/avatar";
import { decode } from "base64-arraybuffer";

const useAvatarUpload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        const resizedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 200, height: 200 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
        );

        setImage({ ...result.assets[0], uri: resizedImage.uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    try {
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: "base64",
      });

      await uploadAvatar(decode(base64));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return {
    image,
    pickImage,
    handleUpload,
  };
};

export default useAvatarUpload;
