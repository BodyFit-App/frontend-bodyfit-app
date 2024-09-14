import React from "react";
import { Controller, Control } from "react-hook-form";
import { View, Text } from "react-native";
import { FormData } from ".";
import SessionForm from "./SessionForm";

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
