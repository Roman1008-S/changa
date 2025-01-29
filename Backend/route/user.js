import express from "express";
import * as UserController from "../controller/userController.js"; // Import all the auth-related controllers

const userRouter = express.Router();

// Authentication Routes
userRouter.post("/profileUpdate", UserController.profileUpdate); // Log out the authenticated user

export default userRouter;