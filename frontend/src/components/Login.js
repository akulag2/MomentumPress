// src/components/Login.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Login.scss";

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleLogin = () => {
        login(credentials);
    };

    return (
        <div className="login_container layout">
            <div className="login">
                <h2>Login</h2>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                username: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                <p className="register_section">
                    Don't have account register <a href="/register">here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
