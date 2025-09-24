import type { VehicleCardProps } from "../../common/Types/Interfaces";
import InfoRow from "./InfoRow";

const VehicleCard = ({ type, make, model, year, color }: VehicleCardProps) => {
    return (
        <section className="white-bg p-4 rounded-lg shadow-md">
            {/* ================== Title ================== */}
            <h4 className="font-semibold mb-3">Vehicle</h4>

            {/* ================== Info Rows ================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {/* Type */}
                <InfoRow label="Type" value={type || "-"} />
                {/* Make */}
                <InfoRow label="Make" value={make || "-"} />
                {/* Model */}
                <InfoRow label="Model" value={model || "-"} />
                {/* Year */}
                <InfoRow label="Year" value={year || "-"} />
                {/* Color */}
                <InfoRow label="Color" value={color || "-"} />
            </div>
        </section>
    );
};

export default VehicleCard;
