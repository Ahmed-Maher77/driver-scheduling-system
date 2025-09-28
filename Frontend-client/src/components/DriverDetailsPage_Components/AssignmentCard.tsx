import type { AssignmentCardProps } from "../../common/Types/Interfaces";
import { extractDate } from "../../utils/functions/formatDate";
import InfoRow from "./InfoRow";

const AssignmentCard = ({ assignedRoute }: AssignmentCardProps) => {
    return (
        <section className="white-bg p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-3">Assigned Route</h4>
            {assignedRoute?.route_id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {/* Route ID */}
                    <InfoRow label="Route ID" value={assignedRoute.route_id} to={`/routes/${assignedRoute.route_id}`} />
                    {/* From */}
                    <InfoRow label="From" value={assignedRoute.start_location} />
                    {/* To */}
                    <InfoRow label="To" value={assignedRoute.end_location} />
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
            ) : (
                <p className="gray-c text-sm">No current assignment</p>
            )}
        </section>
    );
};

export default AssignmentCard;
