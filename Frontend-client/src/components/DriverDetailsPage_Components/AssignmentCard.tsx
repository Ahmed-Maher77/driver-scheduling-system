import type { AssignmentCardProps } from "../../common/Types/Interfaces";
import InfoRow from "./InfoRow";

const AssignmentCard = ({ assignedRoute }: AssignmentCardProps) => {
    return (
        <section className="white-bg p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-3">Assigned Route</h4>
            {assignedRoute?.id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {/* Route ID */}
                    <InfoRow label="Route ID" value={assignedRoute.id} />
                    {/* From */}
                    <InfoRow label="From" value={assignedRoute.startLocation} />
                    {/* To */}
                    <InfoRow label="To" value={assignedRoute.endLocation} />
                    {/* Assigned At */}
                    <InfoRow
                        label="Assigned At"
                        value={assignedRoute.assignedAt}
                    />
                    {/* Distance */}
                    <InfoRow
                        label="Distance"
                        value={
                            assignedRoute.distance != null
                                ? `${assignedRoute.distance} ${
                                      assignedRoute.distanceUnit || ""
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
                                      assignedRoute.timeUnit || ""
                                  }`.trim()
                                : "-"
                        }
                    />
                </div>
            ) : (
                <p className="gray-c text-sm">No current assignment</p>
            )}
        </section>
    );
};

export default AssignmentCard;
