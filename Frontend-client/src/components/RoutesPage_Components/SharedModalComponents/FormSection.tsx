import React from "react";

interface FormSectionProps {
    children: React.ReactNode;
    className?: string;
    onSubmit?: (e: React.FormEvent) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
    children,
    className = "space-y-6",
    onSubmit,
}) => {
    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default FormSection;
