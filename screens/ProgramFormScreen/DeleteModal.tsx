import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Modal, Portal } from "react-native-paper";
import theme from "../../theme";

type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * DeleteModal Component
 *
 * This component renders a modal that asks the user to confirm a deletion action. It provides two options:
 * "Annuler" to cancel the deletion and "Supprimer" to confirm the deletion.
 *
 * @component
 * @example
 * const [isVisible, setIsVisible] = useState(false);
 *
 * const handleConfirm = () => {
 *   // Handle the confirm action
 *   setIsVisible(false);
 * };
 *
 * const handleClose = () => {
 *   setIsVisible(false);
 * };
 *
 * return (
 *   <DeleteModal
 *     visible={isVisible}
 *     onClose={handleClose}
 *     onConfirm={handleConfirm}
 *   />
 * );
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.visible - A boolean that determines if the modal is visible or not.
 * @param {function} props.onClose - A function that is called when the modal is closed without confirming.
 * @param {function} props.onConfirm - A function that is called when the user confirms the deletion.
 *
 * @returns {JSX.Element} The DeleteModal component.
 */

const DeleteModal = ({ visible, onClose, onConfirm }: DeleteModalProps) => {
  return (
    <Portal>
      <Modal testID="modal" visible={visible} onDismiss={onClose}>
        <View
          style={{
            backgroundColor: theme.colors.background,
            padding: 20,
            marginHorizontal: 30,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 16,
              color: theme.colors.secondary,
            }}
          >
            Confirmer la suppression
          </Text>
          <Text style={{ color: theme.colors.secondary }}>
            Es-tu sûr de vouloir supprimer ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <CustomButton testID="button-close" onPress={onClose}>
              Annuler
            </CustomButton>
            <CustomButton testID="button-confirm" onPress={onConfirm}>
              Supprimer
            </CustomButton>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default DeleteModal;
