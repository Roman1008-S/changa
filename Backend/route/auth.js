import express from "express";
import * as AuthController from "../controller/authController.js"; // Import the specific function

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/user/me", AuthController.loadUser);

export default authRouter; // Export the router as default