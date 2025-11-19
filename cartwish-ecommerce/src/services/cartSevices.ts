import apiClient from "../utils/api-client";

export function addToCartAPI(id: string, quantity: number) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

export function getCartAPI() {
  return apiClient.get("/cart");
}
