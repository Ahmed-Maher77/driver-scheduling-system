interface RoutesControlsProps {
    onExportCsv: () => void;
    onAddRoute: () => void;
}

const RoutesControls = ({ onExportCsv, onAddRoute }: RoutesControlsProps) => {
    return (
        <div className="routes-controls flex justify-end gap-5 max-sm:gap-3 my-5">
            <button
                onClick={onExportCsv}
                className="main-btn button-black-bg flex items-center gap-2 max-sm:text-xs"
            >
                <i className="fa-solid fa-download max-sm:text-sm"></i>
                Export CSV
            </button>
            <button
                onClick={onAddRoute}
                className="main-btn blue-bg flex items-center gap-2 max-sm:text-xs"
            >
                <i className="fa-solid fa-plus max-sm:text-sm"></i>
                Add Route
            </button>
        </div>
    );
};

export default RoutesControls;
