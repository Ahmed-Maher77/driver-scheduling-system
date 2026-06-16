const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

// Admin Login endpoint
router.post("/", async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail || !password) {
            return res.status(400).json({
                message: "Please enter both username/email and password.",
                error: "MISSING_CREDENTIALS"
            });
        }

        // Search by username or email (case-insensitive)
        const admin = await Admin.findOne({
            $or: [
                { username: usernameOrEmail.toLowerCase() },
                { email: usernameOrEmail.toLowerCase() }
            ]
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid credentials. Please check and try again.",
                error: "INVALID_CREDENTIALS"
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials. Please check and try again.",
                error: "INVALID_CREDENTIALS"
            });
        }

        // Generate JWT Token (expires in 24 hours)
        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                name: admin.name,
                role: admin.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Respond with token and user details
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                username: admin.username,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Internal server error during login.",
            error: error.message
        });
    }
});

module.exports = router;
