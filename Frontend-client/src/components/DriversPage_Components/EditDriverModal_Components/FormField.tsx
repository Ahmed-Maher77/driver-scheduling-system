import type { FormFieldProps } from "../../../common/Types/Interfaces";


const FormField = ({ label, children, className = "" }: FormFieldProps) => {
    return (
        <div className={`main-input-container ${className}`}>
            <label className="block gray-c-d text-sm mb-2">{label}</label>
            {children}
        </div>
    );
};

export default FormField;
