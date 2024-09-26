import React from "react";
import { Controller, Control } from "react-hook-form";
import { View, Text } from "react-native";
import SessionForm from "./SessionForm";
import { FormData } from "./types";

/**
 * SessionPanel Component
 *
 * This component is responsible for rendering a session form to either add or edit a session. It uses the `react-hook-form`
 * Controller to manage form inputs and state. The form includes fields for the session title, description, and exercises.
 *
 * @component
 * @example
 * // Example usage
 * return (
 *   <SessionPanel
 *     control={control}
 *     onBack={handleBack}
 *     index={index} // Optional index to edit a specific session
 *   />
 * );
 *
 * @param {Object} props - The props for the SessionPanel component.
 * @param {Control<FormData>} props.control - The control object from `react-hook-form` used to manage form state and validation.
 * @param {Function} props.onBack - Callback function triggered to navigate back or exit the session form.
 * @param {number} [props.index] - (Optional) The index of the session being edited, if applicable. If not provided, it is considered as adding a new session.
 *
 * @returns {JSX.Element} The SessionPanel component.
 */

type SessionPanelProps = {
  control: Control<FormData>;
  onBack: () => void;
  index?: number;
};

const SessionPanel = ({ control, onBack, index }: SessionPanelProps) => {
  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <SessionForm
            value={value || []}
            onChange={onChange}
            onBack={onBack}
            index={index}
          />
        )}
        name="sessions"
      />
    </View>
  );
};

export default SessionPanel;
