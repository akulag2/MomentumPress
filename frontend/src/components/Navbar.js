import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.scss";

const Navbar = () => {
    const { userData } = useAuth();
    const currentDate = new Date();
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
        currentDate
    );

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar_container">
            <div className="navbar layout">
                <div className="primary">
                    <h1 className="title">MomentumPress</h1>
                    <h2 className="title title_mobile">MP</h2>
                    <div className="nav_links">
                        <a href="/" className="link">
                            Home
                        </a>
                        <a href="/about-us" className="link">
                            About Us
                        </a>
                        <a href="/contact-us" className="link">
                            Contact Us
                        </a>
                        {userData ? (
                            <a href="/profile" className="link">
                                {userData.username}
                            </a>
                        ) : (
                            <a href="/login" className="link">
                                Login
                            </a>
                        )}
                    </div>
                    <div className="calender">
                        <p>{formattedDate}</p>
                        <div className="menu_icon" onClick={toggleMenu}>
                            {menuOpen ? (
                                <span className="close">&#10005;</span>
                            ) : (
                                <span>&#9776;</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="secondary">
                    <div className="nav_links">
                        <a href="/articles/technology" className="link">
                            Technology
                        </a>
                        <a href="/articles/science" className="link">
                            Science
                        </a>
                        <a href="/articles/sports" className="link">
                            Sports
                        </a>
                        <a href="/articles/politics" className="link">
                            Politics
                        </a>
                        <a href="/articles/automobiles" className="link">
                            Automobiles
                        </a>
                        <a href="/articles/movies" className="link">
                            Movies
                        </a>
                    </div>
                </div>
                <div className={`menu ${menuOpen ? "open" : ""}`}>
                    <div className="primary_menu">
                        <div className="nav_links">
                            <a href="/" className="link">
                                Home
                            </a>
                            <a href="/about-us" className="link">
                                About Us
                            </a>
                            <a href="/contact-us" className="link">
                                Contact Us
                            </a>
                            {userData ? (
                                <a href="/profile" className="link">
                                    {userData.username}
                                </a>
                            ) : (
                                <a href="/login" className="link">
                                    Login
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="secondary_menu">
                        <div className="nav_links">
                            <a href="/articles/science" className="link">
                                Science
                            </a>
                            <a href="/articles/sports" className="link">
                                Sports
                            </a>
                            <a href="/articles/politics" className="link">
                                Politics
                            </a>
                            <a href="/articles/automobiles" className="link">
                                Automobiles
                            </a>
                            <a href="/articles/movies" className="link">
                                Movies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
