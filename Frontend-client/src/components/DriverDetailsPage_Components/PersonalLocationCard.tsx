import type { PersonalLocationCardProps } from "../../common/Types/Interfaces";
import InfoRow from "./InfoRow";

const PersonalLocationCard = ({
    gender,
    address,
    city,
    country,
}: PersonalLocationCardProps) => {
    return (
        <div className="p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            {/* ================== Title ================== */}
            <h5 className="font-semibold mb-2 text-xs md:text-base lg:text-lg">
                Personal & Location
            </h5>

            {/* ================== Info Rows ================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {/* Gender */}
                <InfoRow label="Gender" value={gender || "-"} />
                {/* Address */}
                <InfoRow label="Address" value={address || "-"} />
                {/* City */}
                <InfoRow label="City" value={city || "-"} />
                {/* Country */}
                <InfoRow label="Country" value={country || "-"} />
            </div>
        </div>
    );
};

export default PersonalLocationCard;
