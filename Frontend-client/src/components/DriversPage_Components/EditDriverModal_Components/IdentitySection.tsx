import type { IdentitySectionProps } from "../../../common/Types/Interfaces";

const IdentitySection = ({ form, update }: IdentitySectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Identity Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* ================== National ID (Readonly) ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        National ID
                    </label>
                    <input
                        className="main-input bg-gray-100 cursor-not-allowed w-full"
                        value={
                            typeof form.national_id === "string"
                                ? form.national_id
                                : ""
                        }
                        readOnly
                        disabled
                    />
                </div>

                {/* ================== Gender ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Gender
                    </label>
                    <div className="relative">
                        <select
                            className="main-input appearance-none pr-8 w-full"
                            value={form.gender || ""}
                            onChange={(e) => update("gender", e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                </div>

                {/* ================== Date of Birth ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Date of Birth
                    </label>
                    <input
                        className="main-input w-full"
                        type="date"
                        value={
                            form.date_of_birth
                                ? new Date(form.date_of_birth)
                                      .toISOString()
                                      .split("T")[0]
                                : ""
                        }
                        onChange={(e) =>
                            update("date_of_birth", e.target.value)
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default IdentitySection;
