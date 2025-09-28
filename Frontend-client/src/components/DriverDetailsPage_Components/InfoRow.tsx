import type { InfoRowProps } from "../../common/Types/Interfaces";

const InfoRow = ({ label, value, href }: InfoRowProps) => {
    return (
        <div className="flex flex-col">
            {/* Label */}
            <span className="gray-c-d text-xs md:text-sm lg:text-base font-medium">
                {label}
            </span>

            {/* Value (with href if provided) */}
            {href && value ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm social-link break-all"
                >
                    {String(value)}
                </a>
            ) : (
                <span className="text-sm gray-c">{value ?? "-"}</span>
            )}
        </div>
    );
};

export default InfoRow;
