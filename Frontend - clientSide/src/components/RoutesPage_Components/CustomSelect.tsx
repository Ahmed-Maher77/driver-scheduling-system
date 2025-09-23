import type { CustomSelectProps, SelectOption } from "../../common/Types/Interfaces";

const CustomSelect = <T extends string>({
    label,
    value,
    options,
    onChange,
    className = "",
    placeholder,
    fullWidth = false,
}: CustomSelectProps<T>) => {
    return (
        <div
            className={`custom-select flex flex-col gap-2 flex-grow-1 ${fullWidth ? "w-full" : ""} ${className}`}>
            {/* Label */}
            {label && (
                <label className="block gray-c-d text-sm">
                    {label}
                </label>
            )}
            
            {/* Select */}
            <div className="main-input-container w-full cursor-pointer">
                <select
                    className="main-input w-full appearance-none pr-9 cursor-pointer"
                    value={value}
                    onChange={(e) => onChange(e.target.value as T)}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt: SelectOption<T>) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                
                {/* Arrow Icon */}
                <i className="fa-solid fa-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 gray-c-l"></i>
            </div>
        </div>
    );
};

export default CustomSelect;
