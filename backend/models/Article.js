// models/Article.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }], // Assuming images are stored as URLs
    thumbnailImage: { type: String },
    publishedDate: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        role: { type: String }, // Add the user role in the author field
    },
    // Add more fields if needed
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
