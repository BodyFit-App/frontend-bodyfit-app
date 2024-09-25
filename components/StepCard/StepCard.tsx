import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

/**
 * StepCard Component
 *
 * This component represents a step card that displays the step number, a description,
 * and allows either deleting the step (editable mode) or validating the step (validation mode).
 * The validation icon can be a filled check or an outlined check depending on whether the step is validated.
 *
 * @component
 * @example
 * // Example for an editable step
 * return (
 *   <StepCard
 *     stepNumber={1}
 *     description="This is the description for step 1."
 *     onDelete={() => console.log('Step deleted')}
 *     isEditable={true}
 *   />
 * );
 *
 * @example
 * // Example for a non-editable but validatable step
 * return (
 *   <StepCard
 *     stepNumber={2}
 *     totalSteps={4}
 *     description="This is the description for step 2 of 4."
 *     onValidate={() => console.log('Step validated')}
 *     isEditable={false}
 *     isValidated={true}
 *   />
 * );
 *
 * @param {Object} props - The component props.
 * @param {number} props.stepNumber - The number of the current step.
 * @param {number} [props.totalSteps] - The total number of steps (only displayed in validation mode).
 * @param {string} props.description - The description of the step.
 * @param {function} [props.onDelete] - Function called when the step is deleted (editable mode).
 * @param {function} [props.onValidate] - Function called when the step is validated (validation mode).
 * @param {boolean} props.isEditable - Indicates if the step is in editable mode (displays the delete icon).
 * @param {boolean} [props.isValidated=false] - Indicates if the step is validated in validation mode (displays a filled or outlined check icon).
 *
 * @returns {JSX.Element} A React element representing a step card with conditional actions depending on the mode.
 */

interface StepCardProps {
  stepNumber: number;
  totalSteps?: number;
  description: string;
  onDelete?: () => void;
  onValidate?: () => void;
  isEditable: boolean;
  isValidated?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  totalSteps,
  description,
  onDelete,
  onValidate,
  isEditable,
  isValidated = false,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        {isEditable ? (
          <>
            <Text style={styles.stepTitle}>Étape {stepNumber}</Text>
            <IconButton
              icon="delete"
              iconColor="#2F80ED"
              size={20}
              onPress={onDelete}
              style={styles.iconButton}
              testID="delete-button"
            />
          </>
        ) : (
          <>
            <Text style={styles.stepTitle}>
              Étape {stepNumber} sur {totalSteps}
            </Text>
            <IconButton
              icon={isValidated ? "check" : "check"}
              iconColor={isValidated ? "#2F80ED" : "#A0A0A0"}
              size={20}
              onPress={onValidate}
              style={styles.iconButton}
              testID={isValidated ? "check" : "check-outline"}
            />
          </>
        )}
      </View>
      <Text style={styles.description}>{description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161626",
    borderColor: "#2F80ED",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepTitle: {
    color: "#2F80ED",
    fontWeight: "bold",
    marginLeft: 10,
  },
  description: {
    color: "#ffffff",
    marginLeft: 10,
    marginBottom: 10,
  },
  iconButton: {
    marginRight: 10,
  },
});

export default StepCard;
