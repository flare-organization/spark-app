import {createContext, useContext} from "react";
import {User} from "@openapi/model/user.ts";
import {LoginRequest} from "@openapi/model/loginRequest.ts";
import {SignUpRequest} from "@openapi/model/signUpRequest.ts";

export interface AuthData {
    user: User | null
    isLoading: boolean
    login(request: LoginRequest): Promise<void>
    register(request: SignUpRequest): Promise<void>
    logout(): Promise<void>
}

export const AuthContext = createContext<AuthData | null>(null)

export const useAuth = (): AuthData => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}