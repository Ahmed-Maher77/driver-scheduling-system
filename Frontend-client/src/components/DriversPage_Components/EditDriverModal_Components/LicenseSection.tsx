import type { LicenseSectionProps } from "../../../common/Types/Interfaces";

const LicenseSection = ({ form, update }: LicenseSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Driving License</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ================== License Type ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        License Type
                    </label>
                    <div className="relative">
                        <select
                            className="main-input appearance-none pr-8 w-full"
                            value={form.driving_license.type}
                            onChange={(e) =>
                                update("driving_license.type", e.target.value)
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="A">A - Motorcycle</option>
                            <option value="B">B - Car</option>
                            <option value="C">C - Truck</option>
                            <option value="D">D - Bus</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                </div>

                {/* ================== License Number ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        License Number
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter license number"
                        value={form.driving_license.number}
                        onChange={(e) =>
                            update("driving_license.number", e.target.value)
                        }
                    />
                </div>

                {/* ================== License Expiration Date ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Expiration Date
                    </label>
                    <input
                        className="main-input w-full"
                        type="date"
                        value={form.driving_license.expiration}
                        onChange={(e) =>
                            update("driving_license.expiration", e.target.value)
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default LicenseSection;
