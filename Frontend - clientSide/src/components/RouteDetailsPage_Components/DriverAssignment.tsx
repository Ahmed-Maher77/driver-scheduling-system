import type { DriverAssignmentProps } from "../../common/Types/Interfaces";
import DriverCard from "./DriverCard";

const DriverAssignment = ({
    assignedDriver,
    lastDriver,
}: DriverAssignmentProps) => {
    return (
        <section className="driver-assignment white-bg rounded-lg shadow-md p-5 w-full">
            <h3 className="text-lg font-semibold mb-4">Driver Assignment</h3>
            <div className="flex flex-col gap-3">
                <DriverCard
                    title="Assigned Driver"
                    driver={assignedDriver || null}
                />
                {lastDriver && (
                    <DriverCard title="Last Driver" driver={lastDriver || null} />
                )}
            </div>
        </section>
    );
};

export default DriverAssignment;
