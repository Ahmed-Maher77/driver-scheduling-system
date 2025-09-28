import { createPortal } from "react-dom";
import type { ImageModalProps } from "../../../common/Types/Interfaces";

const ImageModal = ({ isOpen, imageUrl, title, onClose }: ImageModalProps) => {
    if (!isOpen) return null;

    // Render the modal outside of the current DOM tree using Portal
    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 top-0 left-0 w-full h-full"
            onClick={onClose}
            style={{ backgroundColor: "#00000060" }}
        >
            <div className="relative max-w-4xl max-h-full">
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer right-[-43px] top-[-18px] text-white hover:text-gray-300 text-[1.7rem] z-10"
                >
                    <i className="fa-solid fa-times"></i>
                </button>
                <div className="bg-white rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-center">
                        {title}
                    </h3>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="max-w-full max-h-[80vh] object-contain rounded"
                    />
                </div>
            </div>
        </div>,
        document.body // Render directly to document.body
    );
};

export default ImageModal;
