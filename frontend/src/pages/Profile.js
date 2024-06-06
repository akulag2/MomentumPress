import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logout from "../components/Logout";
import "./Profile.scss";
import ArticleForm from "../components/ArticleForm";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";

const Profile = () => {
    const { userData } = useAuth();
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            if (userData) {
                const userToken = "Bearer " + userData.token;
                try {
                    const response = await axios.get(
                        "http://localhost:8000/articles/user-articles",
                        {
                            headers: {
                                Authorization: userToken,
                            },
                        }
                    );
                    setArticles(response.data);
                } catch (error) {
                    console.error("Failed to fetch articles: ", error);
                }
            }
        };
        fetchArticles();
    }, [userData]);
    return (
        <div className="profile_container layout">
            <h2>profile</h2>
            <div className="profile">
                <div className="user_details">
                    <h3>{userData.username}</h3>
                    <p>{userData.role}</p>
                </div>
                <div>
                    <h3>Articles</h3>
                    {articles && <p>{articles.length}</p>}
                </div>
                <Logout />
            </div>
            <ArticleForm />
            {articles && <ArticlesList articles={articles} />}
        </div>
    );
};

export default Profile;
