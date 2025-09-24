import type { PastRoutesTimelineProps } from "../../common/Types/Interfaces";

const PastRoutesTimeline = ({ items }: PastRoutesTimelineProps) => {
    // If no items, return a message
    if (!items?.length) {
        return (
            <section className="white-bg p-4 rounded-lg shadow-md mt-5">
                <h4 className="font-semibold mb-3">Past Assigned Routes</h4>
                <p className="gray-c text-sm">No past routes</p>
            </section>
        );
    }

    return (
        <section className="white-bg p-4 rounded-lg shadow-md mt-5">
            <h4 className="font-semibold mb-3">Past Assigned Routes</h4>
            <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-2 top-2 bottom-2 w-[2px] bg-[#e9edf2]"></div>

                {/* Past Routes */}
                {items.map((r) => (
                    <div key={r.id} className="relative mb-4 last:mb-0">
                        {/* Dot */}
                        <span className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-[#3b82f6] border-2 border-white shadow"></span>
                        {/* Content */}
                        <div className="flex flex-col">
                            {/* Route ID */}
                            <span className="font-medium">{r.id}</span>
                            {/* Start Location */}
                            <span className="gray-c text-xs md:text-sm">
                                {r.startLocation} → {r.endLocation}
                            </span>
                            {/* End Location */}
                            <span className="gray-c text-xs md:text-sm">
                                {r.startLocation} → {r.endLocation}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PastRoutesTimeline;
