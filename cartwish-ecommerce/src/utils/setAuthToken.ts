import apiClient from "./api-client";

const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["x-auth-token"] = token;
  }
  if (!token) {
    delete apiClient.defaults.headers.common["x-auth-token"];
  }
};
export default setAuthToken;
