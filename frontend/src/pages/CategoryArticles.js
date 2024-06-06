import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArticlesList from "../components/ArticlesList";
import Pagination from "../components/Pagination";
import "./CategoryArticles.scss";

const CategoryArticles = () => {
    const { category } = useParams();
    const { pageNumber } = useParams();
    const [catArticles, setCatArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (pageNumber) {
            setCurrentPage(parseInt(pageNumber));
        } else {
            setCurrentPage(1);
        }

        const fetchCatArticles = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/articles/category/${category}?page=${pageNumber}`
                );
                setCatArticles(response.data.articles);
                setTotalPages(Math.ceil(response.data.totalCount / 9));
            } catch (error) {
                console.error("Failed to fetch category articles: ", error);
            }
        };
        fetchCatArticles();
    }, [category, pageNumber]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            navigate(`/articles/${category}/page/${currentPage - 1}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            navigate(`/articles/${category}/page/${currentPage + 1}`);
        }
    };

    return (
        <div className="category layout">
            <h1>{category} articles</h1>
            {catArticles && <ArticlesList articles={catArticles} />}
            <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default CategoryArticles;
