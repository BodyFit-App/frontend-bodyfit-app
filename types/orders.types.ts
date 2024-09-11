import { Tables } from "./database.types";

export type ExerciseOrder = {
  field: keyof Tables<"exercises">;
  asc?: boolean;
};

export type ProgramOrder = {
  field: keyof Tables<"programs">;
  asc?: boolean;
};

export type GoalOrder = {
  field: keyof Tables<"goals">;
  asc?: boolean;
};
