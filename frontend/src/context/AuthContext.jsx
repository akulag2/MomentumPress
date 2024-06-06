// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
};

const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};

const removeUserDataFromLocalStorage = () => {
    localStorage.removeItem("userData");
};

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(getUserDataFromLocalStorage());

    const login = async (credentials) => {
        try {
            // Make API request to login endpoint using Axios
            const response = await axios.post(
                "http://localhost:8000/auth/login",
                credentials
            );

            if (response.status === 200) {
                const data = response.data;
                setUserData(data.userData);
                saveUserDataToLocalStorage(data.userData);
                window.history.pushState(null, "", "/");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Email or Password is wrong");
        }
    };

    const logout = () => {
        setUserData(null);
        removeUserDataFromLocalStorage();
    };

    return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
