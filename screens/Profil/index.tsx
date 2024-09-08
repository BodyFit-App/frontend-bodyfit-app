import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import useAvatarUpload from "../../hooks/useAvatarUpload";

const ProfilScreen = () => {
  const { image, handleUpload, pickImage } = useAvatarUpload();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil</Text>
      <Button onPress={pickImage}>Pick an image from gallery</Button>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button onPress={handleUpload}>Send Image</Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161626",
  },
  text: {
    color: "#2F80ED",
    fontSize: 24,
  },
});

export default ProfilScreen;
