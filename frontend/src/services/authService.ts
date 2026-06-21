import { http } from '@/lib/http/http.ts'
import { SignUpCredentials } from '@openapi/model/signUpCredentials.ts'
import { LoginCredentials } from '@openapi/model/loginCredentials.ts'

export async function signup(signUpCredentials: SignUpCredentials) {
    const res = await http.post('/api/v1/signup', signUpCredentials)

    return res.data
}

export async function login(loginCredentials: LoginCredentials) {
    const res = await http.post('/api/v1/login', loginCredentials)

    return res.data
}
