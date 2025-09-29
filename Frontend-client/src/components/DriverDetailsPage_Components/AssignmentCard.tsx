import { useState } from "react";
import type { AssignmentCardProps } from "../../common/Types/Interfaces";
import { extractDate } from "../../utils/functions/formatDate";
import InfoRow from "./InfoRow";
import { notify } from "../../utils/functions/notify";
import useUpdateDriver from "../../utils/hooks/api/useUpdateDriver";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const AssignmentCard = ({ assignedRoute, driverId }: AssignmentCardProps) => {
    const [showUnassignConfirm, setShowUnassignConfirm] = useState(false);
    const { updateDriver, isPending: isUnassigning } = useUpdateDriver();

    const handleUnassignDriver = () => {
        setShowUnassignConfirm(true);
    };

    const confirmUnassign = async () => {
        if (!driverId) {
            notify("error", "Driver ID is required");
            return;
        }

        try {
            // Unassign driver by setting assignedRoute_id to null
            await updateDriver({
                driverId,
                driverData: {
                    assignedRoute_id: null,
                } as any,
                showNotification: false, // Disable the default notification
            });

            setShowUnassignConfirm(false);
            notify("success", "Driver unassigned successfully");
        } catch (error: any) {
            console.error("Error unassigning driver:", error);
            notify("error", "Failed to unassign driver");
        }
    };

    const cancelUnassign = () => {
        setShowUnassignConfirm(false);
    };

    return (
        <section className="white-bg p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-3">Assigned Route</h4>
            {assignedRoute?.route_id ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {/* Route ID */}
                        <InfoRow
                            label="Route ID"
                            value={assignedRoute.route_id}
                            to={`/routes/${assignedRoute.route_id}`}
                        />
                        {/* From */}
                        <InfoRow
                            label="From"
                            value={assignedRoute.start_location}
                        />
                        {/* To */}
                        <InfoRow
                            label="To"
                            value={assignedRoute.end_location}
                        />
                        {/* Assigned At */}
                        <InfoRow
                            label="Assigned At"
                            value={extractDate(assignedRoute.assigned_at || "")}
                        />
                        {/* Distance */}
                        <InfoRow
                            label="Distance"
                            value={
                                assignedRoute.distance != null
                                    ? `${assignedRoute.distance} ${
                                          assignedRoute.distance_unit || ""
                                      }`.trim()
                                    : "-"
                            }
                        />
                        {/* Duration */}
                        <InfoRow
                            label="Duration"
                            value={
                                assignedRoute.duration != null
                                    ? `${assignedRoute.duration} ${
                                          assignedRoute.time_unit || ""
                                      }`.trim()
                                    : "-"
                            }
                        />
                    </div>
                    {/* Unassign Driver */}
                    <button
                        className="w-full hover:bg-red-500 hover:text-white bg-transparent text-red-500 hover:border-red-500 border border-red-500 px-4 py-2 rounded-full mt-5 trans-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={handleUnassignDriver}
                        disabled={isUnassigning}
                    >
                        {isUnassigning ? "Unassigning..." : "Unassign"}
                    </button>
                </div>
            ) : (
                <p className="gray-c text-sm">No current assignment</p>
            )}

            {/* Unassign Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showUnassignConfirm}
                onClose={cancelUnassign}
                onConfirm={confirmUnassign}
                title="Unassign Driver"
                message={`Are you sure you want to unassign this driver from route ${assignedRoute?.route_id}?`}
                confirmButtonText="Unassign"
                cancelButtonText="Cancel"
                isLoading={isUnassigning}
            />
        </section>
    );
};

export default AssignmentCard;
