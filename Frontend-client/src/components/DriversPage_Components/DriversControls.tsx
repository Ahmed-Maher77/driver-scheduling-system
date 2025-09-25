import type { DriversControlsProps } from "../../common/Types/Interfaces";

const DriversControls = ({
    onExportCsv,
    onAddDriver,
    isExportingCsv = false,
}: DriversControlsProps) => {
    return (
        <div className="drivers-controls flex justify-end gap-5 max-sm:gap-3 my-5">
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
            <button
                onClick={onAddDriver}
                className="main-btn blue-bg flex items-center gap-2 max-sm:text-xs"
            >
                <i className="fa-solid fa-plus max-sm:text-sm"></i>
                Add Driver
            </button>
        </div>
    );
};

export default DriversControls;
