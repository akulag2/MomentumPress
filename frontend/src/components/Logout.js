// src/components/Logout.js
import React from "react";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
