import type { BulkActionsBarProps } from "../../common/Types/Interfaces";

const BulkActionsBar = ({
    selectedCount,
    onDeleteSelected,
}: BulkActionsBarProps) => {
    if (selectedCount === 0) return null;

    return (
        <div className="bulk-bar yellow-50 p-3 rounded-lg flex items-center justify-between mt-[-10px]">
            {/* Selected Items Count */}
            <span className="gray-c-d">{selectedCount} selected</span>

            {/* Delete Selected Items */}
            <button
                onClick={onDeleteSelected}
                className="red-c font-semibold cursor-pointer hover-red-c"
            >
                Delete selected
            </button>
        </div>
    );
};

export default BulkActionsBar;
