import jwt from "jsonwebtoken";
import Token from "../services/token.js"

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = Token.validate(JSON.parse(token)); // Verify the token
        req.user = decoded.payload; // Attach the user payload to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;