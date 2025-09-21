interface BulkActionsBarProps {
    selectedCount: number;
    onDeleteSelected: () => void;
}

const BulkActionsBar = ({
    selectedCount,
    onDeleteSelected,
}: BulkActionsBarProps) => {
    if (selectedCount === 0) return null;

    return (
        <div className="bulk-bar yellow-50 p-3 rounded-lg flex items-center justify-between mt-[-10px]">
            <span className="gray-c-d">{selectedCount} selected</span>
            <button onClick={onDeleteSelected} className="red-c font-semibold">
                Delete selected
            </button>
        </div>
    );
};

export default BulkActionsBar;
