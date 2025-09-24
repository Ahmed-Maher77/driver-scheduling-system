import type { DriverForm } from "../../../common/Types/Interfaces";

interface VehicleSectionProps {
    form: DriverForm;
    errors: Record<string, string>;
    update: (path: string, value: string | File | null) => void;
}

const VehicleSection = ({ form, errors, update }: VehicleSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Vehicle</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ================== Type ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Type <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["vehicle.type"] ? "border-red-500" : ""
                        }`}
                        placeholder="Vehicle type"
                        value={form.vehicle.type}
                        onChange={(e) => update("vehicle.type", e.target.value)}
                    />
                    {errors["vehicle.type"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["vehicle.type"]}
                        </p>
                    )}
                </div>

                {/* ================== Make ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Make <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["vehicle.make"] ? "border-red-500" : ""
                        }`}
                        placeholder="Make"
                        value={form.vehicle.make}
                        onChange={(e) => update("vehicle.make", e.target.value)}
                    />
                    {errors["vehicle.make"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["vehicle.make"]}
                        </p>
                    )}
                </div>

                {/* ================== Model ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Model <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["vehicle.model"] ? "border-red-500" : ""
                        }`}
                        placeholder="Model"
                        value={form.vehicle.model}
                        onChange={(e) =>
                            update("vehicle.model", e.target.value)
                        }
                    />
                    {errors["vehicle.model"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["vehicle.model"]}
                        </p>
                    )}
                </div>

                {/* ================== Year ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Year <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["vehicle.year"] ? "border-red-500" : ""
                        }`}
                        placeholder="Year"
                        value={form.vehicle.year}
                        onChange={(e) => update("vehicle.year", e.target.value)}
                    />
                    {errors["vehicle.year"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["vehicle.year"]}
                        </p>
                    )}
                </div>

                {/* ================== Color ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Color <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["vehicle.color"] ? "border-red-500" : ""
                        }`}
                        placeholder="Color"
                        value={form.vehicle.color}
                        onChange={(e) =>
                            update("vehicle.color", e.target.value)
                        }
                    />
                    {errors["vehicle.color"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["vehicle.color"]}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default VehicleSection;
