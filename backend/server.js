import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import articlesRoutes from "./routes/articles.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// Articles routes
app.use("/articles", articlesRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
