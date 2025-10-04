import ModalWrapper from "../../components/RoutesPage_Components/SharedModalComponents/ModalWrapper";
import type { DayRoutesModalProps } from "../../common/Types/Interfaces";

const DayRoutesModal = ({
    isOpen,
    dateLabel,
    routes,
    onClose,
    onSeeDetails,
}: DayRoutesModalProps) => {
    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="relative p-6 w-full">
                {/* ================== Close Button ================== */}
                <button
                    aria-label="Close"
                    className="absolute right-3 top-3 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                >
                    <i className="fa-solid fa-xmark text-xl" />
                </button>

                {/* ================== Header ================== */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold">
                        Routes on {dateLabel}
                    </h3>
                    <p className="gray-c text-sm">
                        Click See details to open the route page.
                    </p>
                </div>

                {/* ================== Routes ================== */}
                {routes.length ? (
                    <div className="grid gap-3">
                        {routes.map((r) => (
                            <div
                                key={r.route_id}
                                className="rounded border border-[#e9edf2] p-4 flex flex-col md:flex-row items-start justify-between gap-4 hover:shadow-sm transition"
                            >
                                <div className="flex-1 min-w-0">
                                    {/* Route ID + Assigned At */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold truncate">
                                            {r.route_id}
                                        </span>
                                        <span className="px-2 py-[2px] text-[10px] rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                            {r.assigned_at
                                                ? new Date(
                                                      r.assigned_at
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </span>
                                    </div>

                                    {/* From + To */}
                                    <div className="gray-c text-xs md:text-sm mt-1 truncate">
                                        <span className="font-semibold gray-c-d">
                                            From:
                                        </span>{" "}
                                        {r.start_location || "?"}
                                        <span className="mx-2">→</span>
                                        <span className="font-semibold gray-c-d">
                                            To:
                                        </span>{" "}
                                        {r.end_location || "?"}
                                    </div>
                                </div>

                                {/* ================== See Details Button ================== */}
                                <div className="shrink-0">
                                    <button
                                        className="main-btn button-black-bg"
                                        onClick={() => onSeeDetails(r.route_id)}
                                    >
                                        <i className="fa-regular fa-eye" /> See
                                        details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="gray-c text-sm">No routes for this day.</p>
                )}
            </div>
        </ModalWrapper>
    );
};

export default DayRoutesModal;
