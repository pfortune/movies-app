import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
    element: React.ReactElement;
    redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, redirectTo = "/" }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={redirectTo} />;
    }

    return element;
};

export default PrivateRoute;
