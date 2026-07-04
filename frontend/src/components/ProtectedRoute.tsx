import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth.ts";

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const data = useAuth();

    useEffect(() => {
        if (!data?.user) {
            navigate("/login");
            return;
        }
    });
    return <Outlet/>;
};