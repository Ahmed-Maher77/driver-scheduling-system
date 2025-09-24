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
                    <div className="relative">
                        <select
                            className="main-input appearance-none pr-8 w-full"
                            value={form.vehicle.type}
                            onChange={(e) =>
                                update("vehicle.type", e.target.value)
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="Car">Car</option>
                            <option value="Truck">Truck</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Van">Van</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
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
