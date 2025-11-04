import { useState, useEffect } from "react";
import apiClient from "../utils/api-client";

const useData = <T>(
  endpoint: string,
  customConfig?: { params?: Record<string, string> },
  deps?: React.DependencyList
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(endpoint, customConfig)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : "An error occurred");
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? deps : []
  );
  return { data, error, isLoading };
};

export default useData;
