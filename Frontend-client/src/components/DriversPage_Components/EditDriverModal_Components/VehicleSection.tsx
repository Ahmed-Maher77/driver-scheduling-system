import type { VehicleSectionProps } from "../../../common/Types/Interfaces";

const VehicleSection = ({ form, update }: VehicleSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Vehicle Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ================== Vehicle Type ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Vehicle Type
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter vehicle type"
                        value={form.vehicle.type}
                        onChange={(e) => update("vehicle.type", e.target.value)}
                    />
                </div>

                {/* ================== Vehicle Make ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">Make</label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter vehicle make"
                        value={form.vehicle.make}
                        onChange={(e) => update("vehicle.make", e.target.value)}
                    />
                </div>

                {/* ================== Vehicle Model ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">Model</label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter vehicle model"
                        value={form.vehicle.model}
                        onChange={(e) =>
                            update("vehicle.model", e.target.value)
                        }
                    />
                </div>

                {/* ================== Vehicle Year ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">Year</label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter year"
                        value={form.vehicle.year}
                        onChange={(e) => update("vehicle.year", e.target.value)}
                    />
                </div>

                {/* ================== Vehicle Color ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">Color</label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter vehicle color"
                        value={form.vehicle.color}
                        onChange={(e) =>
                            update("vehicle.color", e.target.value)
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default VehicleSection;
