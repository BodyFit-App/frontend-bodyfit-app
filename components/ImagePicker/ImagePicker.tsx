import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ViewProps,
} from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import theme from "../../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getPublicUrl } from "../../lib/supabase";

type ImagePickerProps = {
  value: string | null;
  onChange: (uri: string) => void;
  width?: number;
  aspect?: [number, number];
  imageStyle?: {};
};

/**
 * Props for the ImagePicker component.
 *
 * @typedef {Object} ImagePickerProps
 * @property {string | null} value - The URI of the currently selected image.
 * @property {(uri: string) => void} onChange - Callback function triggered when an image is selected or changed.
 * @property {number} [width=300] - The width to resize the image to. Defaults to 300.
 * @property {[number, number]} [aspect=[4, 3]] - The aspect ratio to maintain when cropping the image. Defaults to [4, 3].
 * @property {Object} [imageStyle] - Optional styles to apply to the image.
 */

/**
 * ImagePicker component allows users to pick an image from their device's media library,
 * resize it, and apply an optional aspect ratio. It also displays the selected image
 * or a placeholder icon when no image is selected.
 *
 * @param {ImagePickerProps & ViewProps} props - The props for the ImagePicker component.
 * @returns {JSX.Element} The image picker component.
 */

function ImagePicker({
  value,
  onChange,
  width = 300,
  aspect = [4, 3],
  imageStyle,
  ...rest
}: ImagePickerProps & ViewProps) {
  const pickImage = async () => {
    const { status } =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Désolé, nous avons besoin de la permission pour accéder à vos photos."
      );
      return;
    }

    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
    });

    if (!result.canceled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width, height: width * (aspect[1] / aspect[0]) } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      onChange(resizedImage.uri);
    }
  };

  return (
    <View
      style={{
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 2,
      }}
      {...rest}
    >
      <TouchableOpacity
        testID="image-picker"
        style={{ width: "100%" }}
        onPress={pickImage}
      >
        {value ? (
          <Image
            source={{
              uri: value!.startsWith("file://")
                ? value
                : getPublicUrl("images", value),
            }}
            style={{ ...styles.image, ...(imageStyle ? imageStyle : "") }}
          />
        ) : (
          <View
            style={{
              ...styles.image,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="image"
                size={50}
                color={theme.colors.textPlaceholder}
                style={{ marginBottom: 16 }}
              />
              <Text style={{ color: theme.colors.textPlaceholder }}>
                Uploader une image
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default ImagePicker;
