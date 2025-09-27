const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Use memory storage for Vercel compatibility
const storage = multer.memoryStorage();

// File filter (to allow images, PDFs, and Word documents)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        const error = new Error(
            `Invalid file type. Only images (JPEG, JPG, PNG, GIF), PDF, and Word documents (DOC, DOCX) are allowed. Received: ${
                ext || "unknown"
            }`
        );
        error.code = "INVALID_FILE_TYPE";
        cb(error);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "No file provided",
            });
        }

        // Convert file to base64 for Vercel compatibility
        const base64File = req.file.buffer.toString("base64");
        const dataUrl = `data:${req.file.mimetype};base64,${base64File}`;

        // Generate a unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(req.file.originalname);

        // Return success response with file information
        res.status(200).json({
            message: "File uploaded successfully",
            file: {
                filename: filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                url: dataUrl, // Return as data URL for immediate use
            },
        });
    } catch (error) {
        console.error("UploadImageOnServer Error:", error);

        // Handle specific multer errors
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "File too large. Maximum file size is 5MB.",
            });
        }

        if (error.code === "INVALID_FILE_TYPE") {
            return res.status(400).json({
                message: error.message,
            });
        }

        // Handle multer errors
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message:
                    "Unexpected field. Please use 'image' as the field name.",
            });
        }

        // Generic error
        res.status(500).json({
            message: `Error uploading image on server: ${error.message}`,
        });
    }
});

module.exports = router;
