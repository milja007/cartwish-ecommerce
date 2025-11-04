import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../utils/api-client";

const useData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(url)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      });
  }, [url]);
  return { data, error, isLoading };
};

export default useData;
