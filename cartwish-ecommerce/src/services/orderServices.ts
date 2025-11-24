import apiClient from "../utils/api-client";

export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}

export function orderInfoAPI() {
  return apiClient.get("/order");
}
