const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication failed. Access denied.",
                error: "UNAUTHORIZED"
            });
        }

        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                message: "Authentication failed. Token is missing.",
                error: "TOKEN_MISSING"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user payload to the request
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed. Invalid or expired token.",
            error: "INVALID_TOKEN",
            details: error.message
        });
    }
};

module.exports = authMiddleware;
