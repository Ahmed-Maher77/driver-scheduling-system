import type { HeaderSummaryProps } from "../../common/Types/Interfaces";
import { extractDate } from "../../utils/functions/formatDate";


const getStatusBadgeClass = (status: string) => {
    if (status === "available") return "green-bg";
    if (status === "on_route") return "yellow-bg";
    return "red-bg";
};

const HeaderSummary = ({
    name,
    id,
    status,
    joinedAt,
    pictureUrl,
    onEdit,
    onDelete,
}: HeaderSummaryProps) => {
    return (
        <section className="white-bg p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* ================== Picture + Name + Status + Joined At ================== */}
            <div className="flex items-center gap-4">
                {/* Picture */}
                <img
                    src={pictureUrl}
                    alt={name}
                    className="w-16 h-16 img-border-full object-cover"
                />
                <div>
                    {/* Name + ID */}
                    <h3 className="text-lg font-semibold">
                        {name} <span className="gray-c text-sm">({id})</span>
                    </h3>
                    {/* Status + Joined At */}
                    <div className="flex items-center gap-2 mt-1">
                        <span
                            className={`status-badge badge ${getStatusBadgeClass(
                                status
                            )}`.trim()}
                        >
                            {status === "on_route" ? "on route" : status}
                        </span>
                        {joinedAt && (
                            <span className="gray-c text-sm">
                                Joined: {extractDate(joinedAt)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ================== Action Buttons ================== */}
            <div className="flex items-center justify-end gap-2 max-sm:w-full">
                {/* Edit Button */}
                <button className="main-btn blue-bg" onClick={onEdit}>
                    <i className="fa-regular fa-pen-to-square"></i> Edit
                </button>
                {/* Delete Button */}
                <button className="main-btn red-bg" onClick={onDelete}>
                    <i className="fa-regular fa-trash-can"></i> Delete
                </button>
            </div>
        </section>
    );
};

export default HeaderSummary;
