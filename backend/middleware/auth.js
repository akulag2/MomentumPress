// middleware/auth.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Middleware to authenticate users using JWT
export const authenticateUser = asyncHandler(async (req, res, next) => {
    // Check if a valid JWT is present in the request headers
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Unauthorized - Token not provided" });
    }

    // Extract the token without the "Bearer" prefix
    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure that the decoded token includes the 'id' field
        if (!decoded.id) {
            throw new Error("Invalid token - User ID not present");
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error during token verification:", error);
        console.error("Decoded token:", error.decoded); // Log the decoded token

        return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token" });
    }
});

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    // Check if the user is an admin (assuming the user role is stored in req.user.role)
    console.log("req: ", req.user);
    if (req.user && req.user.role === "admin") {
        // If an admin, call next() to proceed
        next();
    } else {
        // If not an admin, return 403 Forbidden
        return res.status(403).json({ message: "Forbidden" });
    }
};
