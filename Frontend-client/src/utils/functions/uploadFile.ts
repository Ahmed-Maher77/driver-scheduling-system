import axiosInstance from "../hooks/api/axios-utils";

// Enhanced interfaces for better type safety
export interface UploadFileData {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    url: string;
    uploadedAt: string;
}

export interface UploadFileResponse {
    success: boolean;
    message: string;
    data: UploadFileData;
    error?: string;
}

export interface UploadError extends Error {
    code?: string;
    response?: {
        data: {
            success: boolean;
            message: string;
            error: string;
        };
    };
}

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Client-side file validation
export function validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return {
            isValid: false,
            error: `File size exceeds 5MB limit. Current size: ${(
                file.size /
                1024 /
                1024
            ).toFixed(2)}MB`,
        };
    }

    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: `Invalid file type. Allowed types: Images (JPEG, PNG, GIF, WEBP), PDF, Word documents (DOC, DOCX)`,
        };
    }

    // Check if file is empty
    if (file.size === 0) {
        return {
            isValid: false,
            error: "Empty file not allowed",
        };
    }

    return { isValid: true };
}

// Enhanced upload function with better error handling
export async function uploadFile(file: File): Promise<UploadFileData> {
    // Validate file before upload
    const validation = validateFile(file);
    if (!validation.isValid) {
        throw new Error(validation.error);
    }

    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axiosInstance.post<UploadFileResponse>(
            "/upload-image-on-server",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                timeout: 30000, // 30 second timeout for file uploads
            }
        );

        // Check if upload was successful
        if (!response.data.success) {
            throw new Error(response.data.message || "Upload failed");
        }

        return response.data.data;
    } catch (error: any) {
        // Enhanced error handling
        if (error.response?.data) {
            const errorData = error.response.data;
            throw new Error(errorData.message || "Upload failed");
        } else if (error.code === "ECONNABORTED") {
            throw new Error(
                "Upload timeout. Please try again with a smaller file."
            );
        } else if (error.message) {
            throw new Error(error.message);
        } else {
            throw new Error("Network error occurred during upload");
        }
    }
}

// Enhanced multiple file upload with progress tracking
export async function uploadMultipleFiles(
    files: File[],
    onProgress?: (completed: number, total: number) => void
): Promise<UploadFileData[]> {
    const results: UploadFileData[] = [];
    let completed = 0;

    for (const file of files) {
        try {
            const result = await uploadFile(file);
            results.push(result);
            completed++;
            onProgress?.(completed, files.length);
        } catch (error) {
            // Log error but continue with other files
            console.error(`Failed to upload file ${file.name}:`, error);
            throw error; // Re-throw to stop the process
        }
    }

    return results;
}

// Utility function to format file size
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
