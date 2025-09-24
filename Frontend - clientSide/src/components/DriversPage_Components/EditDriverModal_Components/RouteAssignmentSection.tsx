import type { RouteAssignmentSectionProps } from "../../../common/Types/Interfaces";

const RouteAssignmentSection = ({
    form,
    isUnavailable,
    isCheckingAvailability,
    routeAvailabilityStatus,
    update,
    onCheckAvailability,
    onRouteIdChange,
}: RouteAssignmentSectionProps) => {
    if (isUnavailable) return null;

    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Assign to Route (optional)</h4>
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="main-input-container w-full">
                    <label className="block gray-c-d text-sm mb-2">
                        Route ID
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter Route ID"
                        value={form.assignedRouteId || ""}
                        onChange={(e) => {
                            update("assignedRouteId", e.target.value);
                            onRouteIdChange();
                        }}
                    />
                </div>

                {/* Check Availability Button */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="main-btn green-bg hover-green-bg px-4 py-2 whitespace-nowrap"
                        onClick={onCheckAvailability}
                        disabled={
                            isCheckingAvailability || !form.assignedRouteId
                        }
                    >
                        {isCheckingAvailability ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                Checking...
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-search mr-2"></i>
                                Check Availability
                            </>
                        )}
                    </button>

                    {/* Route Availability Status */}
                    {routeAvailabilityStatus !== "unknown" && (
                        <div className="flex items-center gap-2">
                            {routeAvailabilityStatus === "unassigned" ? (
                                <>
                                    <i className="fa-solid fa-check-circle text-green-600"></i>
                                    <span className="text-green-600 font-medium">
                                        Available
                                    </span>
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-times-circle text-red-600"></i>
                                    <span className="text-red-600 font-medium">
                                        Unavailable
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RouteAssignmentSection;
