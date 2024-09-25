import { Tables } from "./database.types";

/**
 * Filter criteria for fetching exercises.
 * 
 * @typedef {Object} ExerciseFilter
 * @property {string} [category] - The category to filter exercises by.
 * @property {number} [profile_id] - The ID of the profile associated with the exercise.
 * @property {string} [profile_pseudo] - The pseudo of the profile associated with the exercise.
 * @property {string} [title] - The title of the exercise to filter by.
 */

export type ExerciseOrder = {
  field: keyof Tables<"exercises">;
  asc?: boolean;
};

/**
 * Filter criteria for fetching programs.
 * 
 * @typedef {Object} ProgramFilter
 * @property {string} [category] - The category to filter programs by.
 * @property {number} [profile_id] - The ID of the profile associated with the program.
 * @property {string} [profile_pseudo] - The pseudo of the profile associated with the program.
 * @property {string} [title] - The title of the program to filter by.
 */

export type ProgramOrder = {
  field: keyof Tables<"programs">;
  asc?: boolean;
};

/**
 * Filter criteria for fetching goals.
 * 
 * @typedef {Object} GoalFilter
 * @property {string} [title] - The title of the goal to filter by.
 * @property {boolean} [achieved] - Whether the goal has been achieved.
 * @property {number} [profile_id] - The ID of the profile associated with the goal.
 */

export type GoalOrder = {
  field: keyof Tables<"goals">;
  asc?: boolean;
};

/**
 * Filter criteria for fetching profiles.
 * 
 * @typedef {Object} ProfileFilter
 * @property {string} [pseudo] - The pseudo of the profile to filter by.
 */

export type ProfileOrder = {
  field: keyof Tables<"profiles">;
  asc?: boolean;
};
