import { http } from '@/lib/http/http.ts'
import {LoginRequest} from "@openapi/model/loginRequest.ts";
import {SignUpRequest} from "@openapi/model/signUpRequest.ts";

export async function signup(signUpCredentials: SignUpRequest) {
    const res = await http.post('/api/v1/signup', signUpCredentials)

    return res.data
}

export async function login(loginCredentials: LoginRequest) {
    const res = await http.post('/api/v1/login', loginCredentials)

    return res.data
}
