import React from "react";
import ImageRemovalButton from "./ImageRemovalButton";
import "./FileUpload.scss";

interface FileInfoWithRemoveProps {
    file: File;
    onRemove: () => void;
    className?: string;
    showRemoveButton?: boolean;
    removeButtonSize?: "sm" | "md" | "lg";
    removeButtonVariant?: "danger" | "secondary" | "outline";
}

const FileInfoWithRemove: React.FC<FileInfoWithRemoveProps> = ({
    file,
    onRemove,
    className = "",
    showRemoveButton = true,
    removeButtonSize = "sm",
    removeButtonVariant = "danger",
}) => {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const getFileIcon = (fileName: string): string => {
        const extension = fileName.split(".").pop()?.toLowerCase();
        switch (extension) {
            case "pdf":
                return "fa-solid fa-file-pdf";
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "webp":
                return "fa-solid fa-file-image";
            case "doc":
            case "docx":
                return "fa-solid fa-file-word";
            case "xls":
            case "xlsx":
                return "fa-solid fa-file-excel";
            default:
                return "fa-solid fa-file";
        }
    };

    return (
        <div className={`file-info-with-remove ${className}`}>
            <div className="file-info">
                <i
                    className={`${getFileIcon(
                        file.name
                    )} file-info-icon text-green-500`}
                ></i>
                <div className="file-info-details">
                    <span className="file-info-name" title={file.name}>
                        {file.name}
                    </span>
                    <span className="file-info-size">
                        {formatFileSize(file.size)}
                    </span>
                </div>
                {showRemoveButton && (
                    <ImageRemovalButton
                        onRemove={onRemove}
                        size={removeButtonSize}
                        variant={removeButtonVariant}
                        tooltip="Remove file"
                    />
                )}
            </div>
        </div>
    );
};

export default FileInfoWithRemove;
