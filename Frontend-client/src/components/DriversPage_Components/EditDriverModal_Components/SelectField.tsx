import type { SelectFieldProps } from "../../../common/Types/Interfaces";

const SelectField = ({
    value,
    onChange,
    options,
    className = "",
}: SelectFieldProps) => {
    return (
        <div className={`relative ${className}`}>
            <select
                className="main-input appearance-none pr-8 w-full"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
        </div>
    );
};

export default SelectField;
