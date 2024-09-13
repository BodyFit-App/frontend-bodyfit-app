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

interface ImagePickerProps {
  value: string | null;
  onChange: (uri: string) => void;
  width?: number;
  aspect?: [number, number];
  rest?: ViewProps;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  value,
  onChange,
  width = 300,
  aspect = [4, 3],
  ...rest
}) => {
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
      <TouchableOpacity onPress={pickImage}>
        {value ? (
          <Image source={{ uri: value! }} style={styles.image} />
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
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default ImagePicker;
