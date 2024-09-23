import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import ImagePicker from "../../components/ImagePicker/ImagePicker";
import theme from "../../theme";
import { fetchProfileById, updateProfile } from "../../api/profiles";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TablesInsert } from "../../types/database.types";
import { uploadImage } from "../../buckets/images";
import { AppParamListBase } from "../../navigations/main";

export const ProfileFormScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ProfileFormScreen">) => {
  const { session, deleteAccount } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;
  const queryClient = useQueryClient();

  const { data: profile, isSuccess } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => fetchProfileById(profileId),
    enabled: !!profileId,
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TablesInsert<"profiles"> & { profileImage: string }>({
    defaultValues: {
      pseudo: "",
      firstname: "",
      lastname: "",
      avatar_url: "",
    },
  });

  const pseudoValue = watch("pseudo");

  const handleUpdate = async (body: TablesInsert<"profiles">) => {
    let avatar_url = body.avatar_url;
    if (avatar_url && avatar_url.startsWith("file://")) {
      const { path } = await uploadImage(
        avatar_url,
        `${session?.user.id}/avatar.png`
      );
      avatar_url = path;
    }

    const newBody = {
      id: profileId,
      ...body,
      avatar_url: avatar_url,
    };
    updateProfile(newBody);
  };

  const updateMutation = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", profileId] });
      navigation.goBack();
    },
  });

  const onSubmit = (data: any) => {
    updateMutation.mutate(data);
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteAccount();
    } catch (error) {
      // console.error("Erreur lors de la suppression du profil :", error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Supprimer le profil",
      "Êtes-vous sûr de vouloir supprimer votre profil ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: handleDeleteProfile,
        },
      ]
    );
  };

  useEffect(() => {
    if (isSuccess && profile) {
      reset({
        pseudo: profile.pseudo,
        lastname: profile.lastname,
        firstname: profile.firstname,
        avatar_url: profile.avatar_url,
      });
    }
  }, [isSuccess, profile, reset]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      testID="profile-form-screen"
    >
      <View style={styles.imagePseudoContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.imagePickerContainer}>
              <ImagePicker
                testID="image-picker"
                onChange={onChange}
                value={value || ""}
                imageStyle={styles.imagePicker}
                style={{ borderWidth: 0 }}
                aspect={[1, 1]}
                width={150}
              />
            </View>
          )}
          name="avatar_url"
        />

        <View style={styles.pseudoDisplayContainer}>
          <Text style={styles.pseudoText} testID="pseudo-display">
            @{pseudoValue || "pseudo"}
          </Text>
        </View>
      </View>

      <Controller
        control={control}
        rules={{ required: "Le pseudo est requis" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Pseudo"
            placeholder="Entrez votre pseudo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            error={!!errors.pseudo}
            style={styles.textInput}
            mode="outlined"
            testID="pseudo"
          />
        )}
        name="pseudo"
      />
      {errors.pseudo && (
        <Text style={styles.errorText}>{errors.pseudo.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Le prénom est requis" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Prénom"
            placeholder="Entrez votre prénom"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            error={!!errors.firstname}
            style={styles.textInput}
            mode="outlined"
            testID="firstname"
          />
        )}
        name="firstname"
      />
      {errors.firstname && (
        <Text style={styles.errorText}>{errors.firstname.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Le nom est requis" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Nom"
            placeholder="Entrez votre nom"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            error={!!errors.lastname}
            style={styles.textInput}
            mode="outlined"
            testID="lastname"
          />
        )}
        name="lastname"
      />
      {errors.lastname && (
        <Text style={styles.errorText}>{errors.lastname.message}</Text>
      )}

      <CustomButton onPress={handleSubmit(onSubmit)} testID="submit-button">
        Modifier le profil
      </CustomButton>
      <CustomButton
        onPress={confirmDelete}
        textColor="white"
        style={{ backgroundColor: "#AD2823", marginTop: 10 }}
        testID="delete-button"
      >
        Supprimer le profil
      </CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flexGrow: 1,
    justifyContent: "center",
  },
  imagePseudoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  imagePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 26,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  pseudoDisplayContainer: {
    marginLeft: 16,
  },
  pseudoText: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.colors.textFollow,
  },
  textInput: {
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
});
