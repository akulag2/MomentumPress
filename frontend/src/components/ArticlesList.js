import React from "react";
import ArticleCard from "./ArticleCard";
import "./ArticlesList.scss";

const ArticlesList = ({ articles }) => {
    return (
        <div className="articles">
            {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
            ))}
        </div>
    );
};

export default ArticlesList;
