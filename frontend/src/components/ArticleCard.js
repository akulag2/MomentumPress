import React from "react";
import { useAuth } from "../context/AuthContext";
import "./ArticleCard.scss";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    const { userData } = useAuth();
    return (
        <div className="article">
            <img src={article.thumbnailImage} alt={article.title} />
            <h3 className="article_card_title">{article.title}</h3>
            <p className="article_card_short_description">
                {article.shortDescription}
            </p>
            <p>Author: {article.author.username}</p>
            <p>Published at: {article.publishedDate.split("T")[0]}</p>
            <div className="article_links">
                <Link to={`/article/${article._id}`}>
                    <button>Read more...</button>
                </Link>

                {userData &&
                    (userData._id === article.author._id ||
                        userData.role === "admin") && (
                        <Link to={`/article/edit/${article._id}`}>
                            <button>edit</button>
                        </Link>
                    )}
            </div>
        </div>
    );
};

export default ArticleCard;
