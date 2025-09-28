import type { DocumentImageDisplayProps } from "../../../common/Types/Interfaces";


const DocumentImageDisplay = ({
    imageUrl,
    title,
    placeholderIcon,
    placeholderText,
    onImageClick,
    className = "",
}: DocumentImageDisplayProps) => {
    if (imageUrl && typeof imageUrl === "string") {
        return (
            <div
                className={`relative group driver-document-container cursor-pointer border-2 border-gray-300 rounded overflow-hidden max-w-[120px] h-[80px] ${className}`}
                onClick={() => onImageClick(imageUrl, title)}
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                        console.error(
                            `${title} image failed to load:`,
                            imageUrl
                        );
                        e.currentTarget.style.display = "none";
                    }}
                />
                <div className="absolute inset-0 driver-document-preview transition-all duration-200 flex items-center justify-center">
                    <i className="fa-solid fa-expand text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 ${className}`}
        >
            <div className="text-center">
                <i
                    className={`${placeholderIcon} text-gray-400 text-2xl mb-2`}
                ></i>
                <p className="text-gray-500 text-sm">{placeholderText}</p>
            </div>
        </div>
    );
};

export default DocumentImageDisplay;
