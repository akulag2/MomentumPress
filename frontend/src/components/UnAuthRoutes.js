import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UnAuthRoutes = () => {
    const { userData } = useAuth();
    return !userData ? <Outlet /> : <Navigate to={"/profile"} />;
};

export default UnAuthRoutes;
