import type { MonthControlsProps } from "../../common/Types/Interfaces";

const MonthControls = ({
    monthLabel,
    isLoading,
    onPrev,
    onNext,
}: MonthControlsProps) => {
    return (
        <div className="flex items-center justify-between my-10 mt-12">
            {/* ================== Previous Button ================== */}
            <button
                className={`main-btn button-white-bg ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={onPrev}
                disabled={isLoading}
            >
                <i className="fa-solid fa-chevron-left"></i>
                <span className="max-sm:hidden">Prev</span>
            </button>

            {/* ================== Month Label ================== */}
            <div className="font-semibold">{monthLabel}</div>
            
            {/* ================== Next Button ================== */}
            <button
                className={`main-btn button-white-bg ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={onNext}
                disabled={isLoading}
            >
                <span className="max-sm:hidden">Next</span>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default MonthControls;
