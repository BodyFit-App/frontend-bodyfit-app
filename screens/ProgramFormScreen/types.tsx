import { Control, UseFormReturn } from "react-hook-form";

/**
 * FormData Type
 *
 * This type defines the structure of the form data for a program. It includes the
 * program title, description, visibility, and a list of sessions. Each session contains
 * a title, description, and an array of exercise IDs.
 *
 * @typedef {Object} FormData
 * @property {string} title - The title of the program.
 * @property {string} [description] - (Optional) A description of the program.
 * @property {boolean} visible - Whether the program is visible to others.
 * @property {Array<Object>} [sessions] - (Optional) List of sessions within the program.
 * @property {number} [sessions.id] - (Optional) The ID of the session (for existing sessions).
 * @property {string} sessions.title - The title of the session.
 * @property {string} sessions.description - A description of the session.
 * @property {number[]} sessions.exerciseIds - An array of exercise IDs associated with the session.
 */

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

/**
 * ProgramPanelProps Type
 *
 * This type defines the props for the `ProgramPanel` component. It includes callback functions
 * for adding sessions, submitting the form data, and managing sessions to delete. It also manages
 * the form state using `react-hook-form`.
 *
 * @typedef {Object} ProgramPanelProps
 * @property {function} onAddSession - Function to add or edit a session, accepts an optional index.
 * @property {function} onSubmit - Function to submit the form data.
 * @property {UseFormReturn<FormData>} formContext - Form context from `react-hook-form` to manage form state.
 * @property {boolean} isEditMode - Indicates if the form is in edit mode or create mode.
 * @property {React.Dispatch<React.SetStateAction<number[]>>} setSessionToDelete - State handler to manage sessions marked for deletion.
 */

export type ProgramPanelProps = {
  onAddSession: (index?: number) => void;
  onSubmit: (data: FormData) => void;
  formContext: UseFormReturn<FormData>;
  isEditMode: boolean;
  setSessionToDelete: React.Dispatch<React.SetStateAction<number[]>>;
};

/**
 * ProgramFormProps Type
 *
 * This type defines the props for the `ProgramForm` component, which uses the control object from
 * `react-hook-form` to manage form state for the program's basic information (title and description).
 *
 * @typedef {Object} ProgramFormProps
 * @property {Control<FormData>} control - The control object from `react-hook-form` used to manage form state.
 */

export type ProgramFormProps = {
  control: Control<FormData>;
};

/**
 * SessionListProps Type
 *
 * This type defines the props for the `SessionList` component. It includes the list of sessions,
 * and callback functions to add or delete a session.
 *
 * @typedef {Object} SessionListProps
 * @property {Array<Object>} sessions - The list of sessions to display. Each session contains a title.
 * @property {function} onAddSession - Function to add or edit a session, accepts an optional index.
 * @property {function} onDelete - Function to delete a session by its index.
 */

export type SessionListProps = {
  sessions: { title: string }[];
  onAddSession: (index?: number) => void;
  onDelete: (index: number) => void;
};

/**
 * VisibilityToggleProps Type
 *
 * This type defines the props for the `VisibilityToggle` component, which uses the control object from
 * `react-hook-form` to manage the visibility toggle for the program.
 *
 * @typedef {Object} VisibilityToggleProps
 * @property {Control<FormData>} control - The control object from `react-hook-form` used to manage form state.
 */

export type VisibilityToggleProps = {
  control: Control<FormData>;
};
