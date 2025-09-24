import type { RoutesControlsProps } from "../../common/Types/Interfaces";

const RoutesControls = ({
    onExportCsv,
    onAddRoute,
    isExportingCsv = false,
}: RoutesControlsProps) => {
    return (
        <div className="routes-controls flex justify-end gap-5 max-sm:gap-3 my-5">
            {/* ================== Export CSV Button ================== */}
            <button
                onClick={onExportCsv}
                disabled={isExportingCsv}
                className={`main-btn button-black-bg flex items-center gap-2 max-sm:text-xs ${
                    isExportingCsv ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <i
                    className={`fa-solid ${
                        isExportingCsv ? "fa-spinner fa-spin" : "fa-download"
                    } max-sm:text-sm`}
                ></i>
                {isExportingCsv ? "Exporting..." : "Export CSV"}
            </button>

            {/* ================== Add Route Button ================== */}
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
