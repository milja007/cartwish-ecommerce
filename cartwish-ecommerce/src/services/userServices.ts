import apiClient from "../utils/api-client";

interface User {
    name: string;
    email: string;
    password: string;
    deliveryAddress: string;
}

export function signup(user: User, profile: File) {
    const body = new FormData()
    body.append("name" , user.name)
    body.append("email" , user.email)
    body.append("password" , user.password)
    body.append("deliveryAddress" , user.deliveryAddress)
    body.append("profilePic" , profile)


   return apiClient.post("/user/signup" , body)
}