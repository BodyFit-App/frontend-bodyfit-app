import { Control, UseFormReturn } from "react-hook-form";

export type FormData = {
  title: string;
  description?: string;
  visible: boolean;
  sessions?: Array<{
    id?: number;
    title: string;
    description: string;
    exerciseIds: number[];
  }>;
};

export type ProgramPanelProps = {
  onAddSession: (index?: number) => void;
  onSubmit: (data: FormData) => void;
  formContext: UseFormReturn<FormData>;
  isEditMode: boolean;
  setSessionToDelete: React.Dispatch<React.SetStateAction<number[]>>;
};

export type ProgramFormProps = {
  control: Control<FormData>;
};

export type SessionListProps = {
  sessions: { title: string }[];
  onAddSession: (index?: number) => void;
  onDelete: (index: number) => void;
};

export type VisibilityToggleProps = {
  control: Control<FormData>;
};
