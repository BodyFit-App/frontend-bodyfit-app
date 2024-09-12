import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ViewProps,
} from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import theme from "../../theme";

interface ImagePickerProps {
  value: string | null;
  onChange: (uri: string) => void;
  aspect?: [number, number];
  rest?: ViewProps;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  value,
  onChange,
  aspect = [4, 3],
  rest,
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
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
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
        <Image
          source={{ uri: value || "https://via.placeholder.com/200" }}
          style={styles.image}
        />
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
