export type ExerciseFilter = {
  category?: string;
  profile_id?: number;
  profile_pseudo?: string;
  title?: string;
};

export type ProgramFilter = {
  category?: string;
  profile_id?: number;
  profile_pseudo?: string;
  title?: string;
};

export type GoalFilter = {
  title?: string;
  achieved?: boolean;
  profile_id?: number;
};

export type ProfileFilter = {
  pseudo?: string;
};
