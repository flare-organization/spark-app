import {AuthContext, AuthData} from "@/hooks/use-auth";
import {LoginRequest} from "@openapi/model/loginRequest.ts";
import {useEffect, useState} from "react";
import {User} from "@openapi/model/user.ts";
import * as authService from "@/services/authService.ts";
import {SignUpRequest} from "@openapi/model/signUpRequest.ts";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authService
            .getCurrentUser()
            .then(user => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    async function login(request: LoginRequest): Promise<void> {
        const user = await authService.login(request);
        setUser(user);
    }

    async function register(request: SignUpRequest): Promise<void> {
        const user = await authService.signup(request);
        setUser(user);
    }

    async function logout(): Promise<void> {
        await authService.logout();
        setUser(null);
    }

    const authData: AuthData = {
        user,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}