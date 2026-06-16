type RouteInfoProps = {
    startLocation: string;
    endLocation: string;
    distance: number;
    distanceUnit: string;
    duration: number;
    timeUnit: string;
    cost: number;
    currency: string;
    maxSpeed: number;
    speedUnit: string;
};

const InfoRow = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => (
    <div className="p-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all">
        <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">{label}</div>
        <div className="text-[15px] font-semibold mt-1.5 text-gray-800">{value}</div>
    </div>
);

const RouteInfo = ({
    startLocation,
    endLocation,
    distance,
    distanceUnit,
    duration,
    timeUnit,
    cost,
    currency,
    maxSpeed,
    speedUnit,
}: RouteInfoProps) => {
    return (
        <section className="route-info w-full mb-5">
            <h3 className="text-xl font-bold mb-5 text-gray-800 pl-1">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <InfoRow label="Start Location" value={startLocation} />
                <InfoRow label="End Location" value={endLocation} />
                <InfoRow
                    label="Distance"
                    value={`${distance} ${distanceUnit}`}
                />
                <InfoRow label="Duration" value={`${duration} ${timeUnit}`} />
                <InfoRow label="Cost" value={`${cost} ${currency}`} />
                <InfoRow label="Max Speed" value={`${maxSpeed} ${speedUnit}`} />
            </div>
        </section>
    );
};

export default RouteInfo;
