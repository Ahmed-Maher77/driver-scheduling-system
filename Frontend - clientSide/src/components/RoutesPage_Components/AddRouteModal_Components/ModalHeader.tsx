import React from "react";

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold gray-c-d">{title}</h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
            >
                <i className="fa-solid fa-times cursor-pointer"></i>
            </button>
        </div>
    );
};

export default ModalHeader;
