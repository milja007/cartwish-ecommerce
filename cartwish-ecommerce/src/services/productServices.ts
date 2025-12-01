import apiClient from "../utils/api-client";

export function getSuggestionsAPI(search: string) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
