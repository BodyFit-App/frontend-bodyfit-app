/**
 * Filter criteria for fetching exercises.
 * 
 * @typedef {Object} ExerciseFilter
 * @property {string} [category] - The category to filter exercises by.
 * @property {number} [profile_id] - The ID of the profile associated with the exercise.
 * @property {string} [profile_pseudo] - The pseudo of the profile associated with the exercise.
 * @property {string} [title] - The title of the exercise to filter by.
 */
export type ExerciseFilter = {
  category?: string;
  profile_id?: number;
  profile_pseudo?: string;
  title?: string;
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
export type ProgramFilter = {
  category?: string;
  profile_id?: number;
  profile_pseudo?: string;
  title?: string;
};

/**
 * Filter criteria for fetching goals.
 * 
 * @typedef {Object} GoalFilter
 * @property {string} [title] - The title of the goal to filter by.
 * @property {boolean} [achieved] - Whether the goal has been achieved.
 * @property {number} [profile_id] - The ID of the profile associated with the goal.
 */
export type GoalFilter = {
  title?: string;
  achieved?: boolean;
  profile_id?: number;
};

/**
 * Filter criteria for fetching profiles.
 * 
 * @typedef {Object} ProfileFilter
 * @property {string} [pseudo] - The pseudo of the profile to filter by.
 */
export type ProfileFilter = {
  pseudo?: string;
};
