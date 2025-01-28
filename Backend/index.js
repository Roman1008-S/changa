import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./route/auth.js";

dotenv.config();

const app = express();

// CORS options
const corsOptions = {
  origin: true,
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRouter);

// Mongoose connection
mongoose.set("strictQuery", false); // Suppress strict query warnings
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true, // Simplify connection string parsing
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};

// Start server
const port = process.env.PORT || 5000; // Default port if not specified in environment variable
app.listen(port, async () => {
  await connectDB(); // Connect to the database before starting the server
  console.log(`Server is running on port ${port}`);
});