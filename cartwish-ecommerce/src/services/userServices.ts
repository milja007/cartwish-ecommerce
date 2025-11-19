import apiClient from "../utils/api-client";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  email: string;
  password: string;
  deliveryAddress: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const tokenName = "token";

export async function signup(user: User, profile: File | null) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  if (profile) {
    body.append("profilePic", profile);
  }

  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem(tokenName, data.token);
}

export async function login(credentials: LoginCredentials) {
  const { data } = await apiClient.post("/user/login", credentials);
  localStorage.setItem(tokenName, data.token);
}

export function logout() {
  localStorage.removeItem(tokenName);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenName);
    if (!jwt) return null;
    return jwtDecode(jwt);
  } catch (err) {
    if (err) return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}
