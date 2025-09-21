import React from "react";

interface ModalWrapperProps {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    isOpen,
    children,
    className = "max-w-[1000px]",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000050] backdrop-blur-[1px] flex items-center justify-center z-[999] p-4">
            <div
                className={`white-bg rounded-lg shadow-xl ${className} w-full max-h-[90vh] overflow-y-auto`}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
