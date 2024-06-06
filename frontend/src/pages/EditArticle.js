import React, { useEffect, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EditArticle = () => {
    const { userData } = useAuth();
    const params = useParams();
    const [editFormData, setEditFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/articles/article/${params.id}`
                );
                setEditFormData(response.data);
            } catch (error) {
                console.error("Failed to fetch article: ", error);
            }
        };
        fetchFormData();
    }, [params]);

    return (
        <div className="edit_article layout">
            {userData &&
                editFormData &&
                (userData._id === editFormData.author._id ||
                userData.role === "admin" ? (
                    <ArticleForm editFormData={editFormData} />
                ) : (
                    navigate("/")
                ))}
        </div>
    );
};

export default EditArticle;
