import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView } from "react-native";
import ProgramPanel from "./ProgramPanel";
import SessionPanel from "./SessionPanel";

export type FormData = {
  title?: string;
  description?: string;
  visible: boolean;
  sessions?: Array<{
    title: string;
    description: string;
    exerciseIds: number[];
  }>;
};

const ProgramFormScreen = () => {
  const formMethods = useForm<FormData>();
  const { control, handleSubmit } = formMethods;
  const [step, setStep] = useState(1);
  const [selectIndex, setSelectedIndex] = useState<undefined | number>();

  const onAddSession = (index?: number) => {
    setSelectedIndex(index);
    setStep(2);
  };

  const onBack = () => {
    setStep(1);
  };

  const onSubmit = (data: FormData) => {
    console.log("Final Data: ", data);
    // Process the final form data
  };

  return (
    <View style={{ padding: 16 }}>
      <ScrollView>
        <View>
          {step === 1 ? (
            <ProgramPanel
              onAddSession={onAddSession}
              onSubmit={onSubmit}
              formContext={formMethods}
            />
          ) : (
            <SessionPanel
              control={control}
              onBack={onBack}
              index={selectIndex}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgramFormScreen;
