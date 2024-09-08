import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

/**
 * StepCard Component
 *
 * Ce composant représente une carte d'étape qui affiche le numéro de l'étape, une description,
 * et permet soit de supprimer l'étape (mode éditable), soit de valider l'étape (mode validation).
 * L'icône de validation peut être un check plein ou outlined selon si l'étape est validée ou non.
 *
 * @component
 * @example
 * // Exemple pour une étape éditable
 * return (
 *   <StepCard
 *     stepNumber={1}
 *     description="Ceci est la description de l'étape 1."
 *     onDelete={() => console.log('Étape supprimée')}
 *     isEditable={true}
 *   />
 * );
 *
 * @example
 * // Exemple pour une étape non éditable mais validable
 * return (
 *   <StepCard
 *     stepNumber={2}
 *     totalSteps={4}
 *     description="Ceci est la description de l'étape 2 sur 4."
 *     onValidate={() => console.log('Étape validée')}
 *     isEditable={false}
 *     isValidated={true}
 *   />
 * );
 *
 * @param {Object} props - Props du composant.
 * @param {number} props.stepNumber - Le numéro de l'étape actuelle.
 * @param {number} [props.totalSteps] - Le nombre total d'étapes (affiché uniquement dans le mode validation).
 * @param {string} props.description - La description de l'étape.
 * @param {function} [props.onDelete] - Fonction appelée lors de la suppression de l'étape (mode éditable).
 * @param {function} [props.onValidate] - Fonction appelée lors de la validation de l'étape (mode validation).
 * @param {boolean} props.isEditable - Indique si l'étape est en mode éditable (affiche l'icône de suppression).
 * @param {boolean} [props.isValidated=false] - Indique si l'étape est validée dans le mode validation (affiche une icône "check" plein ou outlined).
 *
 * @returns {JSX.Element} Un élément React représentant une carte d'étape avec des actions conditionnelles selon le mode.
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
            />
          </>
        ) : (
          <>
            <Text style={styles.stepTitle}>
              Étape {stepNumber} sur {totalSteps}
            </Text>
            <IconButton
              icon={isValidated ? "check" : "check-outline"}
              iconColor={isValidated ? "#2F80ED" : "#A0A0A0"}
              size={20}
              onPress={onValidate}
              style={styles.iconButton}
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
    width: "95%",
    marginBottom: 10,
    borderRadius: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
