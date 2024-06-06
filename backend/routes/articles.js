// routes/articles.js
import express from "express";
import Article from "../models/Article.js";
import { authenticateUser, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all articles with pagination
// @route   GET /articles
// @access  Public
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse page number from query parameters (default to 1)
        const perPage = parseInt(req.query.perPage) || 9; // Parse items per page from query parameters (default to 10)

        // Calculate the number of documents to skip
        const skip = (page - 1) * perPage;

        // Query paginated articles
        const articles = await Article.find()
            .sort({ publishedDate: -1 }) // Sort by publishedDate in descending order
            .skip(skip) // Skip documents based on pagination parameters
            .limit(perPage) // Limit the number of documents returned per page
            .populate("author", "username role");

        // Query total count of articles
        const totalCount = await Article.countDocuments();

        res.json({ articles, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Get single article
// @route   GET /articles/:id
// @access  Public
router.get("/article/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate(
            "author",
            "username role"
        );
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Get category articles with pagination
// @route   GET /articles/category/:category
// @access  Public
router.get("/category/:category", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse page number from query parameters (default to 1)
        const perPage = parseInt(req.query.perPage) || 9; // Parse items per page from query parameters (default to 10)

        // Calculate the number of documents to skip
        const skip = (page - 1) * perPage;

        // Query paginated category articles
        const articles = await Article.find({
            category: req.params.category,
        })
            .sort({ publishedDate: -1 }) // Sort by publishedDate in descending order
            .skip(skip) // Skip documents based on pagination parameters
            .limit(perPage) // Limit the number of documents returned per page
            .populate("author", "username role");

        // Query total count of category articles
        const totalCount = await Article.countDocuments({
            category: req.params.category,
        });

        res.json({ articles, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Get articles created by the current user
// @route   GET /user-articles
// @access  Private
router.get("/user-articles", authenticateUser, async (req, res) => {
    try {
        // If the user is an admin, fetch all articles
        if (req.user.role === "admin") {
            const articles = await Article.find()
                .sort({ publishedDate: -1 })
                .populate("author", "username role");
            res.json(articles);
        } else {
            // If the user is not an admin, fetch articles created by the user
            const userArticles = await Article.find({
                author: req.user.id,
            })
                .sort({ publishedDate: -1 })
                .populate("author", "username role");
            res.json(userArticles);
        }
    } catch (error) {
        console.error("Error fetching user articles:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// @desc    Create an article
// @route   POST /articles
// @access  Private
router.post("/", authenticateUser, async (req, res) => {
    try {
        const {
            title,
            shortDescription,
            content,
            category,
            images,
            thumbnailImage,
        } = req.body;

        const author = req.user.id; // Assuming req.user contains user information from authentication middleware

        const newArticle = new Article({
            title,
            shortDescription,
            content,
            category,
            images,
            thumbnailImage,
            author,
        });

        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Update an article
// @route   PUT /articles/:id
// @access  Private
router.put("/:id", authenticateUser, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Check if the current user is the author of the article
        if (
            article.author.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(401).json({
                message: "Not authenticateUserd to update this article",
            });
        }

        const {
            title,
            shortDescription,
            content,
            category,
            images,
            thumbnailImage,
        } = req.body;

        article.title = title || article.title;
        article.shortDescription = shortDescription || article.shortDescription;
        article.content = content || article.content;
        article.category = category || article.category;
        article.images = images || article.images;
        article.thumbnailImage = thumbnailImage || article.thumbnailImage;

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Delete an article
// @route   DELETE /articles/:id
// @access  Private
router.delete("/:id", authenticateUser, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Check if the current user is the author of the article
        if (
            article.author.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(401).json({
                message: "Not authorized to delete this article",
            });
        }

        // Check if article.remove is a function before calling it

        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Article removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
