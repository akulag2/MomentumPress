// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home"; // Updated import path
import UnAuthRoutes from "./components/UnAuthRoutes";
import AuthRoutes from "./components/AuthRoutes";
import Profile from "./pages/Profile";
import Article from "./pages/Article";
import EditArticle from "./pages/EditArticle";
import CategoryArticles from "./pages/CategoryArticles";
import About from "./pages/About";
import Contact from "./pages/Contact";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page/:pageNumber" element={<Home />} />
                <Route path="/article/:id" element={<Article />} />
                <Route
                    path="/articles/:category"
                    element={<CategoryArticles />}
                />
                <Route
                    path="/articles/:category/page/:pageNumber"
                    element={<CategoryArticles />}
                />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<Contact />} />
                {/* un auth routes */}
                <Route path="" element={<UnAuthRoutes />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                {/* auth routes */}
                <Route path="" element={<AuthRoutes />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/article/edit/:id" element={<EditArticle />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
