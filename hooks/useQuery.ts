import { useState, useEffect, useCallback } from "react";
import { QueryFn } from "../types/api.types";

export const useQuery = <T>(query: QueryFn<T>, ...args: any[]) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: responseData, error: responseError } = await query(...args);
      if (responseError) {
        throw responseError;
      }
      setData(responseData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [query, ...args]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
