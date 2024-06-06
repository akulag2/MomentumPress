import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Article.scss";

const Article = () => {
    const { userData } = useAuth();
    const params = useParams();
    const [article, setArticle] = useState(null);
    useEffect(() => {
        if (params) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/articles/article/${params.id}`
                    );
                    setArticle(response.data);
                } catch (error) {
                    console.error("Failed to fetch article: ", error);
                }
            };
            fetchArticle();
        }
    }, [params]);

    return (
        <div className="single_article layout">
            <div className="article_data">
                {article && (
                    <>
                        <div className="data_left">
                            <h2>{article.title}</h2>
                            <img
                                src={article.thumbnailImage}
                                alt={article.title}
                            />
                            <p>
                                Category:{" "}
                                <Link to={`/articles/${article.category}`}>
                                    {article.category}
                                </Link>
                            </p>
                            <p>{article.publishedDate.split("T")[0]}</p>
                            <p>Author: {article.author.username}</p>

                            {userData &&
                                (userData._id === article.author._id ||
                                    userData.role === "admin") && (
                                    <Link to={`/article/edit/${article._id}`}>
                                        <button>edit</button>
                                    </Link>
                                )}
                        </div>
                        <div className="data_right">
                            <p>{article.shortDescription}</p>
                            <p>{article.content}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Article;
