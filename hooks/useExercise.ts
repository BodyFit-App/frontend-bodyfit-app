import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../database.types";

const useExercise = (id: Number) => {
  const [exercise, setExercise] = useState<Tables<"exercises"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("exercises")
          .select("*")
          .eq("id", id)
          .single<Tables<"exercises">>();

        if (error) throw error;

        setExercise(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  return { exercise, loading, error };
};

export default useExercise;
