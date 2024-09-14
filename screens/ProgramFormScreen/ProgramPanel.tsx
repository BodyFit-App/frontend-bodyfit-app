import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { View, Text } from "react-native";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import theme from "../../theme";
import {
  Divider,
  IconButton,
  Switch,
  TouchableRipple,
} from "react-native-paper";
import { FormData } from ".";
import DeleteModal from "./DeleteModal";

type ProgramPanelProps = {
  onAddSession: (index?: number) => void;
  onSubmit: (data: FormData) => void;
  formContext: UseFormReturn<FormData>;
  isEditMode: boolean;
};

const ProgramPanel = ({
  onAddSession,
  onSubmit,
  formContext,
  isEditMode,
}: ProgramPanelProps) => {
  const { control, handleSubmit, getValues, setValue } = formContext;
  const sessions = getValues().sessions || [];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedIndex(null);
  };

  const confirmDelete = () => {
    if (selectedIndex !== null) {
      const updatedSessions = sessions.filter((_, i) => i !== selectedIndex);
      setValue("sessions", updatedSessions);
    }
    closeModal();
  };

  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Titre"
            placeholder="Ex: Course à pied"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Description"
            placeholder="Ex: Pensez à bien vous équiper"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={10}
          />
        )}
        name="description"
      />

      <Divider bold />
      <CustomButton onPress={() => onAddSession()}>
        Ajouter une session
      </CustomButton>

      {sessions.map(({ title }, i) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.colors.backgroundButton,
          }}
          key={i}
        >
          <TouchableRipple
            style={{
              flex: 1,
              padding: 16,
            }}
            onPress={() => onAddSession(i)}
          >
            <Text style={{ color: theme.colors.text }}>{title}</Text>
          </TouchableRipple>
          <IconButton onPress={() => openModal(i)} icon="delete" />
        </View>
      ))}
      <Divider bold />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: theme.colors.secondary, fontSize: 16 }}>
              Je souhaite partager ce programme
            </Text>
            <Switch
              style={{ marginLeft: 16 }}
              onValueChange={onChange}
              value={value}
            />
          </View>
        )}
        name="visible"
      />

      <CustomButton onPress={handleSubmit(onSubmit)}>
        {isEditMode ? "Modifier" : "Confirmer"}
      </CustomButton>

      <DeleteModal
        visible={modalVisible}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

export default ProgramPanel;
