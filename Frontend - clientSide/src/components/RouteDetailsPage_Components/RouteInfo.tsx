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
    <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-medium mt-1">{value}</div>
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
        <section className="route-info white-bg rounded-lg shadow-md p-5 mb-5 w-full">
            <h3 className="text-lg font-semibold mb-4">Route Information</h3>
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
