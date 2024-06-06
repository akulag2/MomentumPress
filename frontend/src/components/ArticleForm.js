import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./ArticleForm.scss";
import { useNavigate, useParams } from "react-router-dom";

const ArticleForm = ({ editFormData }) => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        content: "",
        category: "",
        images: [],
        thumbnailImage: "",
        publishedDate: new Date().toISOString(),
        author: userData._id,
    });

    useEffect(() => {
        if (editFormData) {
            setFormData(editFormData);
        }
    }, [editFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (createdArticle) => {
        if (editFormData) {
            alert("Article edited successfully!!!");
            navigate("/profile");
        } else {
            alert("Article created successfully!!!");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this article?")) {
            return;
        }

        try {
            const userToken = "Bearer " + userData.token;

            // Assuming you have the article ID stored in some state variable, replace 'articleId' with the actual variable name
            const response = await axios.delete(
                `http://localhost:8000/articles/${params.id}`,
                {
                    headers: {
                        Authorization: userToken,
                    },
                }
            );

            // Assuming you have a function to handle successful deletion, you can call it here
            onDeleteSuccess(response.data);

            // Optionally, you can reset the form or perform any other necessary actions
            // setFormData(initialFormData);
        } catch (error) {
            console.error("Error deleting article:", error.message);
            // Handle error, e.g., show an error message to the user
            alert("Failed to delete article. Please try again.");
        }
    };

    // ... (inside your ArticleForm component)

    const onDeleteSuccess = (deletedArticle) => {
        alert("Article deleted successfully!!!");
        navigate("/profile");
    };

    const resetForm = () => {
        setFormData({
            title: "",
            shortDescription: "",
            content: "",
            category: "",
            images: [],
            thumbnailImage: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to submit this article?")) {
            return;
        }

        if (
            Object.values(formData).some(
                (value) =>
                    value === "" ||
                    (typeof value === "object" &&
                        Object.values(value).some(
                            (nestedValue) => nestedValue === ""
                        ))
            )
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const userToken = "Bearer " + userData.token;

            let response;

            if (editFormData) {
                // If editFormData is present, it means we are editing an existing article
                response = await axios.put(
                    `http://localhost:8000/articles/${editFormData._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: userToken,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                // If editFormData is not present, it means we are creating a new article
                response = await axios.post(
                    "http://localhost:8000/articles",
                    formData,
                    {
                        headers: {
                            Authorization: userToken,
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            const createdArticle = response.data;

            onSubmit(createdArticle);

            // Reset the form only if you are creating a new article
            if (!editFormData) {
                resetForm();
            }
        } catch (error) {
            console.error("Error creating/updating article:", error.message);
            alert("Failed to create/update article. Please try again.");
        }
    };

    return (
        <form className="article_form layout" onSubmit={handleSubmit}>
            <h2>{editFormData ? "Edit Article" : "Create Article"}</h2>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="shortDescription">Short Description</label>
                <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select option</option>
                    <option value="technology">Technology</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                    <option value="automobiles">Automobiles</option>
                    <option value="movies">Movies</option>
                </select>
            </div>

            <div>
                <label htmlFor="thumbnailImage">Thumbnail Image</label>
                <input
                    type="text"
                    id="thumbnailImage"
                    name="thumbnailImage"
                    value={formData.thumbnailImage}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="images">Images (Array of URLs)</label>
                <input
                    type="text"
                    id="images"
                    name="images"
                    value={formData.images.join(",")}
                    onChange={(e) => {
                        const images = e.target.value.split(",");
                        setFormData((prevData) => ({
                            ...prevData,
                            images,
                        }));
                    }}
                />
            </div>
            <div className="action_buttons">
                <button type="submit">Submit</button>
                {editFormData && (
                    <div className="delete_button" onClick={handleDelete}>
                        Delete
                    </div>
                )}
            </div>
        </form>
    );
};

export default ArticleForm;
