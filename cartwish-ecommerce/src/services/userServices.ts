import apiClient from "../utils/api-client";

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

export function signup(user: User, profile: File | null) {
    const body = new FormData()
    body.append("name" , user.name)
    body.append("email" , user.email)
    body.append("password" , user.password)
    body.append("deliveryAddress" , user.deliveryAddress)
    if (profile) {
        body.append("profilePic" , profile)
    }

   return apiClient.post("/user/signup" , body)
}

export function login(credentials: LoginCredentials){
    return apiClient.post("/user/login" , credentials)
}