import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoutes = () => {
    const { userData } = useAuth();
    return userData ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoutes;
