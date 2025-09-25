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
            <h4 className="font-semibold mb-2">
                Assign to Route{" "}
                <span className="gray-c font-normal">(optional)</span>
            </h4>
            {/* ================== Route ID ================== */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">Route ID</label>
                <div className="flex gap-2">
                    <input
                        className="main-input flex-1"
                        type="text"
                        placeholder="Enter Route ID"
                        value={form.assignedRouteId || ""}
                        onChange={(e) => {
                            update("assignedRouteId", e.target.value);
                            onRouteIdChange();
                        }}
                    />
                    {/* ================== Check Availability Button ================== */}
                    <button
                        type="button"
                        className="main-btn green-bg px-4 py-2 whitespace-nowrap"
                        onClick={onCheckAvailability}
                        disabled={
                            isCheckingAvailability || !form.assignedRouteId
                        }
                    >
                        {isCheckingAvailability
                            ? "Checking..."
                            : "Check Availability"}
                    </button>
                </div>
                {/* ================== Availability Status ================== */}
                {routeAvailabilityStatus !== "unknown" && (
                    <p
                        className={`text-xs mt-2 ${
                            routeAvailabilityStatus === "unassigned"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {routeAvailabilityStatus === "unassigned"
                            ? "✓ Route is available for assignment"
                            : "✗ Route is not available"}
                    </p>
                )}
            </div>
        </section>
    );
};

export default RouteAssignmentSection;
