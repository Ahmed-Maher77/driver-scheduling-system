import axiosInstance from "../hooks/api/axios-utils";

export interface UploadFileResponse {
    message: string;
    file: {
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        path: string;
        url: string;
    };
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post(
        "/upload-image-on-server",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}

export async function uploadMultipleFiles(
    files: File[]
): Promise<UploadFileResponse[]> {
    const uploadPromises = files.map((file) => uploadFile(file));
    return Promise.all(uploadPromises);
}
