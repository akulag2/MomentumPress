import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import "./Home.scss";

const Homepage = () => {
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { pageNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (pageNumber) {
            setCurrentPage(parseInt(pageNumber));
        } else {
            setCurrentPage(1);
        }

        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/articles?page=${pageNumber}`
                );
                setArticles(response.data.articles);
                setTotalPages(Math.ceil(response.data.totalCount / 9));
            } catch (error) {
                console.error("Failed to fetch articles: ", error);
            }
        };

        fetchArticles();
    }, [pageNumber]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            navigate(`/page/${currentPage - 1}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            navigate(`/page/${currentPage + 1}`);
        }
    };

    return (
        <div className="home layout">
            <h1>Welcome to the Homepage</h1>
            {articles.length > 0 && <ArticlesList articles={articles} />}
            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Homepage;
