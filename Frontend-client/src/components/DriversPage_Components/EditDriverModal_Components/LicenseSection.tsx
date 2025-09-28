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
                    <input
                        className="main-input w-full"
                        placeholder="Enter license type"
                        value={form.driving_license.type}
                        onChange={(e) =>
                            update("driving_license.type", e.target.value)
                        }
                    />
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
