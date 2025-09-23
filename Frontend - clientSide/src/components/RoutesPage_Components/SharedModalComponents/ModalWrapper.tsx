import React, { useEffect, useState } from "react";

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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const id = requestAnimationFrame(() => setMounted(true));
            return () => cancelAnimationFrame(id);
        }
        setMounted(false);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[999] p-4 transition-opacity duration-300 ease-out ${
                mounted
                    ? "bg-[#00000050] backdrop-blur-[1px] opacity-100"
                    : "bg-transparent opacity-0 pointer-events-none"
            }`}
        >
            <div
                className={`white-bg rounded-lg shadow-xl ${className} w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out will-change-[transform,opacity] ${
                    mounted
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
