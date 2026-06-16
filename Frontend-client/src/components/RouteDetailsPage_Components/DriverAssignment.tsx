import type { DriverAssignmentProps } from "../../common/Types/Interfaces";
import DriverCard from "./DriverCard";

const DriverAssignment = ({
    assignedDriver,
    lastDriver,
}: DriverAssignmentProps) => {
    const hasAssignedDriver = assignedDriver && assignedDriver.id;
    const hasLastDriver = lastDriver && lastDriver.id;

    return (
        <section className="driver-assignment w-full mb-5">
            <h3 className="text-xl font-bold mb-5 text-gray-800 pl-1">Driver Assignment</h3>
            <div className="flex flex-col gap-4">
                {/* Assigned Driver */}
                {hasAssignedDriver ? (
                    <DriverCard
                        title="Current Driver"
                        driver={assignedDriver}
                    />
                ) : (
                    <div className="no-driver-message p-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/60 border border-white flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-user-slash text-gray-400 text-lg"></i>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                Current Driver
                            </div>
                            <div className="text-sm text-gray-600 font-medium mt-0.5">
                                No driver currently assigned to this route
                            </div>
                        </div>
                    </div>
                )}

                {/* Last Driver */}
                {hasLastDriver ? (
                    <DriverCard title="Previous Driver" driver={lastDriver} />
                ) : (
                    <div className="no-driver-message p-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/60 border border-white flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-history text-gray-400 text-lg"></i>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                Previous Driver
                            </div>
                            <div className="text-sm text-gray-600 font-medium mt-0.5">
                                No drivers have been assigned to this route before
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DriverAssignment;
