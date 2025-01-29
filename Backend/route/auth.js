import express from "express";
import * as AuthController from "../controller/authController.js"; // Import all the auth-related controllers
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to verify authentication

const authRouter = express.Router();

// Authentication Routes
authRouter.post("/register", AuthController.register); // Register a new user
authRouter.post("/login", AuthController.login); // Log in an existing user
authRouter.get("/user/me", authMiddleware, AuthController.loadUser); // Load the authenticated user's profile
authRouter.post("/user/logout", authMiddleware, AuthController.logout); // Log out the authenticated user

export default authRouter;