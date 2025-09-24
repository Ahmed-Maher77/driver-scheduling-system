import type { RouteHeaderProps } from "../../common/Types/Interfaces";
import StatusBadge from "./StatusBadge";

const RouteHeader = ({ id, status, onEdit, onDelete }: RouteHeaderProps) => {
    return (
        <header className="route-header white-bg rounded-lg shadow-md p-5 mb-5">
            <div className="flex gap-7 flex-col">
                {/* Route ID + Status Badge */}
                <div className="flex items-center gap-3 justify-between">
                    <h2 className="text-xl font-semibold">Route {id}</h2>
                    <StatusBadge status={status} />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 justify-end">
                    {/* Action Buttons */}
                    {onEdit && onDelete && (
                        <div className="flex items-center gap-2">
                            {/* Edit Button */}
                            <button
                                onClick={onEdit}
                                className="main-btn blue-bg px-5 py-1.5 text-sm flex items-center justify-center gap-1.5 min-w-[100px]"
                            >
                                <i className="fa-solid fa-pen text-xs"></i>
                                Edit
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={onDelete}
                                className="main-btn red-bg px-5 py-1.5 text-sm flex items-center gap-1.5 justify-center min-w-[100px]"
                            >
                                <i className="fa-solid fa-trash text-xs"></i>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default RouteHeader;
