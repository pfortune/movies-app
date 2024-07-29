import React, { createContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createClient, User } from "@supabase/supabase-js";
import { AuthContextInterface } from "../types/interfaces";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const updateAuthState = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            setToken(session?.access_token || null);
            setUser(session?.user || null);
        } catch (error) {
            console.error("Failed to get session:", error);
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const authenticate = useCallback(async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
            if (error) throw error;
            await updateAuthState();
            navigate(location.state?.from?.pathname || "/");
        } catch (error) {
            console.error("Authentication error:", error);
        }
    }, [location.state, navigate, updateAuthState]);

    const signout = useCallback(async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setToken(null);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    }, [navigate]);

    useEffect(() => {
        updateAuthState();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setToken(session?.access_token || null);
            setUser(session?.user || null);
        });
        return () => subscription.unsubscribe();
    }, [updateAuthState]);

    return (
        <AuthContext.Provider value={{ token, user, authenticate, signout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
