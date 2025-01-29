import bcrypt from "bcryptjs";
import Student from "../model/student.js";
import Facilitator from "../model/facilitator.js";
import Token from "../services/token.js";

// Utility function: Find user by email based on role
const findUserByEmail = async (email) => {
    const student = await Student.findOne({ email });
    const facilitator = await Facilitator.findOne({ email });
    return student || facilitator;
};

const setRole = async (email) => {
    const student = await Student.findOne({ email });
    if (student)
        return "student";
    else
        return "facilitator"
};

// Utility function: Generate token
const generateToken = (user, role) => {
    const { id, email } = user;
    return Token.generate({ id, email, role });
};

// Register Controller
export const register = async (req, res) => {
    const { email, password, name, role, gender } = req.body;

    try {
        // Check if user already exists
        const existingUser =
            role === "student"
                ? await Student.findOne({ email })
                : await Facilitator.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: "failed", message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user based on role
        const user =
            role === "student"
                ? new Student({ name, email, password: hashedPassword, gender })
                : new Facilitator({ name, email, password: hashedPassword, gender });

        await user.save();

        return res.status(201).json({
            status: "success",
            message: "User successfully created",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            status: "failed",
            message: "An error occurred during registration. Please try again.",
        });
    }
};

// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await findUserByEmail(email);
        const role = await setRole(email);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ status: "failed", message: "Incorrect password" });
        }

        // Generate token
        const accessToken = generateToken(user, role);

        // Exclude password from the response
        const { password: _, ...userData } = user._doc;

        return res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            token: accessToken,
            user: userData,
            role: role
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            status: "failed",
            message: "An error occurred during login. Please try again.",
        });
    }
};

// Load User Controller
export const loadUser = async (req, res) => {
    let refresh_User = req.user;
    try {
        const user =
            refresh_User.role === "facilitator"
                ? await Facilitator.findById(refresh_User.id)
                : await Student.findById(refresh_User.id);

        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        // Generate a new token
        const newToken = generateToken(user);

        // Exclude password from the response
        const { password: _, ...userData } = user._doc;

        return res.status(200).json({
            status: "success",
            message: "User loaded successfully",
            token: newToken,
            user: userData,
            role: refresh_User.role
        });
    } catch (error) {
        console.error("Error during loading user:", error);
        return res.status(500).json({ status: "failed", message: "Failed to load user" });
    }
};

// Logout Controller
export const logout = async (req, res) => {
    try {
        if (req.user)
            return res.status(200).json({ status: "success", message: "Successfully logged out" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({
            status: "failed",
            message: "An error occurred during logout. Please try again.",
        });
    }
};