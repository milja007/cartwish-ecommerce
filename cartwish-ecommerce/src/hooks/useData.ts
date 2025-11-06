import { useState, useEffect } from "react";
import apiClient from "../utils/api-client";

interface CustomConfig {
  params?: Record<string, string | number>;
}

interface UseDataReturn<T> {
  data: T | null;
  error: string;
  isLoading: boolean;
}

const useData = <T>(
  endpoint: string,
  customConfig?: CustomConfig,
  deps?: React.DependencyList
): UseDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(endpoint, customConfig)
        .then((res) => {
          if (
            endpoint === "/products" &&
            data &&
            // @ts-expect-error - products property exists on data for /products endpoint
            data.products &&
            customConfig?.params?.page !== 1
          ) {
            setData(
              (prev) =>
                ({
                  ...prev,
                  // @ts-expect-error - products property exists on prev for /products endpoint
                  products: [...prev.products, ...res.data.products],
                } as T)
            );
          } else {
            setData(res.data);
          }
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
