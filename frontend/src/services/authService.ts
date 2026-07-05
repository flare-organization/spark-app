import {http} from '@/lib/http/http.ts'
import {LoginRequest} from "@openapi/model/loginRequest.ts";
import {SignUpRequest} from "@openapi/model/signUpRequest.ts";
import {User} from "@openapi/model/user.ts";

export async function signup(signUpCredentials: SignUpRequest): Promise<User> {
    const res = await http.post<User>('/api/v1/signup', signUpCredentials)

    return res.data
}

export async function login(loginCredentials: LoginRequest): Promise<User> {
    const res = await http.post<User>('/api/v1/login', loginCredentials)

    return res.data
}

export async function logout(): Promise<void> {
    await http.post<void>('/api/v1/logout')
}

export async function getCurrentUser(): Promise<User> {
    const res = await http.get<User>('/api/v1/me')

    return res.data
}