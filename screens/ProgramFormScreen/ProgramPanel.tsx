import React from "react";
import { View } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import SessionList from "./SessionList";
import ProgramForm from "./ProgramForm";
import VisibilityToggle from "./VisibilityToggle";
import DeleteModal from "./DeleteModal";
import { ProgramPanelProps } from "./types";

/**
 * ProgramPanel Component
 *
 * A component that provides the main interface for creating or editing a program.
 * It includes a form for the program details, a session list, visibility toggle, and submission and delete options.
 * The component uses React Hook Form's context to manage form state and handle submission.
 *
 * @component
 * @example
 * return (
 *   <ProgramPanel
 *     onAddSession={handleAddSession}
 *     onSubmit={handleSubmit}
 *     formContext={formMethods}
 *     isEditMode={true}
 *     setSessionToDelete={setSessionToDelete}
 *   />
 * );
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onAddSession - Callback function for adding a new session.
 * @param {Function} props.onSubmit - Callback function for submitting the program form.
 * @param {Object} props.formContext - React Hook Form context object, used to manage the form's state and validation.
 * @param {boolean} props.isEditMode - Boolean indicating whether the component is in edit mode or create mode.
 * @param {Function} props.setSessionToDelete - Function to mark a session for deletion.
 *
 * @returns {JSX.Element} The ProgramPanel component.
 */

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
      <CustomButton testID="confirm" onPress={handleSubmit(onSubmit)}>
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
