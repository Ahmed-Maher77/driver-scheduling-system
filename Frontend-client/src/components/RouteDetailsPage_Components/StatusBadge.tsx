import type { RouteHeaderProps } from "../../common/Types/Interfaces";

const StatusBadge = ({ status }: { status: RouteHeaderProps["status"] }) => {
    const color =
        status === "assigned"
            ? "bg-green-100 text-green-700"
            : status === "unassigned"
            ? "bg-gray-100 text-gray-700"
            : "bg-blue-100 text-blue-700";
            
    return (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
            {status}
        </span>
    );
};

export default StatusBadge;