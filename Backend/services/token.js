import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

const Token = {
    /**
     * Generate a JWT token
     * @param {Object} payload - The payload to encode in the token.
     * @param {Object} [options={}] - Options for the token (e.g., expiration).
     * @returns {string} - The generated JWT token.
     */
    generate(payload, options = {}) {
        const expiresIn = options.expiresIn || TOKEN_EXPIRES_IN;
        try {
            let user = { payload }
            return jwt.sign(user, TOKEN_SECRET, { expiresIn });
        } catch (err) {
            console.error("Error generating token:", err);
            throw new Error("Unable to generate token");
        }
    },

    /**
     * Validate a JWT token
     * @param {string} token - The token to validate.
     * @param {Set} blacklistedTokens - A set of blacklisted tokens.
     * @returns {Object|null} - The decoded token payload if valid, or null if invalid.
     */
    validate(token) {
        try {
            if (!token) {
                return null; // Return null if token is blacklisted or not provided
            }
            return jwt.verify(token, TOKEN_SECRET); // Verify and decode the token
        } catch (err) {
            console.error("Error validating token:", err);
            return null; // Return null if token is invalid
        }
    },

    /**
     * Generate a confirmation token with a shorter expiration time
     * @param {Object} payload - The payload to encode in the confirmation token.
     * @returns {string} - The generated confirmation token.
     */
    generateConfirmToken(payload) {
        return Token.generate(payload, { expiresIn: "1h" }); // 1-hour expiration
    },
};

export default Token;