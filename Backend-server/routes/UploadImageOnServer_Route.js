const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Use memory storage for Vercel compatibility
const storage = multer.memoryStorage();

// Enhanced file validation
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".pdf",
    ".doc",
    ".docx",
];

// Enhanced file filter with MIME type validation
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Check both extension and MIME type for security
    const isValidExtension = ALLOWED_EXTENSIONS.includes(ext);
    const isValidMimeType = ALLOWED_MIME_TYPES.includes(file.mimetype);

    if (isValidExtension && isValidMimeType) {
        cb(null, true);
    } else {
        const error = new Error(
            `Invalid file type. Only images (JPEG, JPG, PNG, GIF, WEBP), PDF, and Word documents (DOC, DOCX) are allowed. Received: ${
                ext || "unknown"
            } (${file.mimetype})`
        );
        error.code = "INVALID_FILE_TYPE";
        cb(error);
    }
};

// Enhanced multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1, // Only one file at a time
        fieldSize: 10 * 1024 * 1024, // 10MB field size limit
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Validate request
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file provided",
                error: "NO_FILE",
            });
        }

        const { originalname, mimetype, size, buffer } = req.file;

        // Additional security checks
        if (size === 0) {
            return res.status(400).json({
                success: false,
                message: "Empty file not allowed",
                error: "EMPTY_FILE",
            });
        }

        // Validate file size (additional check)
        if (size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "File too large. Maximum file size is 5MB.",
                error: "FILE_TOO_LARGE",
            });
        }

        // Convert file to base64 for Vercel compatibility
        const base64File = buffer.toString("base64");
        const dataUrl = `data:${mimetype};base64,${base64File}`;

        // Generate a unique filename with better naming
        const timestamp = Date.now();
        const randomSuffix = Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(originalname);
        const filename = `${timestamp}-${randomSuffix}${fileExtension}`;

        // Log successful upload for monitoring
        console.log(
            `File uploaded successfully: ${originalname} (${size} bytes)`
        );

        // Return success response with comprehensive file information
        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: {
                filename: filename,
                originalname: originalname,
                mimetype: mimetype,
                size: size,
                url: dataUrl,
                uploadedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("UploadImageOnServer Error:", error);

        // Handle specific multer errors with proper error codes
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File too large. Maximum file size is 5MB.",
                error: "FILE_TOO_LARGE",
            });
        }

        if (error.code === "INVALID_FILE_TYPE") {
            return res.status(400).json({
                success: false,
                message: error.message,
                error: "INVALID_FILE_TYPE",
            });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                success: false,
                message:
                    "Unexpected field. Please use 'image' as the field name.",
                error: "INVALID_FIELD_NAME",
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                success: false,
                message: "Too many files. Only one file allowed per request.",
                error: "TOO_MANY_FILES",
            });
        }

        // Generic error
        res.status(500).json({
            success: false,
            message: "Internal server error occurred while uploading file",
            error: "UPLOAD_ERROR",
        });
    }
});

module.exports = router;
