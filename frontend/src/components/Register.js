import React, { useState } from "react";
import axios from "axios";
import "./Register.scss";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/auth/register", {
                username,
                password,
            });
            setUsername("");
            setPassword("");
            setRegister(true);
        } catch (error) {
            console.error("Error registering user:", error);
            alert(`${username} already exists`);
        }
    };

    return (
        <div className="register_container layout">
            <div className="register">
                <h2>Register</h2>
                {!register && (
                    <form>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                minLength={5}
                                title="User name must be atleast 4 characters"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                minLength={5}
                                title="Password must be atleast 4 characters"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={
                                username.length > 4 && password.length > 4
                                    ? handleRegister
                                    : null
                            }
                        >
                            Register
                        </button>
                        <p className="login_section">
                            Already have an account login{" "}
                            <a href="/login">here</a>
                        </p>
                    </form>
                )}
                {register && (
                    <p>
                        <span>Successfully registered please </span>
                        <a href="/login">login</a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Register;
