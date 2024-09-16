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
};

export type ProfileFilter = {
  pseudo?: string;
};
