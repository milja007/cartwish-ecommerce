import apiClient from "../utils/api-client";

export function addToCartAPI(id: string, quantity: number) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

export function getCartAPI() {
  return apiClient.get("/cart");
}

export function removeFromCartAPI(id: number | string) {
  return apiClient.patch(`/cart/remove/${id}`);
}
