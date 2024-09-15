import React from "react";
import { View } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import SessionList from "./SessionList";
import ProgramForm from "./ProgramForm";
import VisibilityToggle from "./VisibilityToggle";
import DeleteModal from "./DeleteModal";
import { ProgramPanelProps } from "./types";

const ProgramPanel = ({
  onAddSession,
  onSubmit,
  formContext,
  isEditMode,
  setSessionToDelete,
}: ProgramPanelProps) => {
  const { control, handleSubmit, getValues, setValue } = formContext;
  const sessions = getValues().sessions || [];

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedIndex(null);
  };

  const confirmDelete = () => {
    if (selectedIndex === null) return closeModal();

    if (sessions[selectedIndex!].id)
      setSessionToDelete((current) => [
        ...current,
        sessions[selectedIndex!].id!,
      ]);

    const updatedSessions = sessions.filter((_, i) => i !== selectedIndex);
    setValue("sessions", updatedSessions);
    closeModal();
  };

  return (
    <View style={{ gap: 16 }}>
      <ProgramForm control={control} />
      <SessionList
        sessions={sessions}
        onAddSession={onAddSession}
        onDelete={openModal}
      />
      <VisibilityToggle control={control} />
      <CustomButton testID="confirm-button" onPress={handleSubmit(onSubmit)}>
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
