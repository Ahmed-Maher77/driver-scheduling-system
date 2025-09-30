import type { DriverAssignmentProps } from "../../common/Types/Interfaces";
import DriverCard from "./DriverCard";

const DriverAssignment = ({
    assignedDriver,
    lastDriver,
}: DriverAssignmentProps) => {
    const hasAssignedDriver = assignedDriver && assignedDriver.id;
    const hasLastDriver = lastDriver && lastDriver.id;

    return (
        <section className="driver-assignment white-bg rounded-lg shadow-md p-5 w-full">
            <h3 className="text-lg font-semibold mb-4">Driver Assignment</h3>
            <div className="flex flex-col gap-3">
                {/* Assigned Driver */}
                {hasAssignedDriver ? (
                    <DriverCard
                        title="Current Driver"
                        driver={assignedDriver}
                    />
                ) : (
                    <div className="no-driver-message p-4 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-user-slash text-gray-400 text-lg"></i>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">
                                Current Driver
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                No driver currently assigned to this route
                            </div>
                        </div>
                    </div>
                )}

                {/* Last Driver */}
                {hasLastDriver ? (
                    <DriverCard title="Previous Driver" driver={lastDriver} />
                ) : (
                    <div className="no-driver-message p-4 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-history text-gray-400 text-lg"></i>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">
                                Previous Driver
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                No drivers have been assigned to this route
                                before
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DriverAssignment;
