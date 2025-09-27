import type { BasicInfoSectionProps } from "../../../common/Types/Interfaces";


const BasicInfoSection = ({ driver, form, update }: BasicInfoSectionProps) => {
    return (
        <section>
            <h4 className="font-semibold mb-2">Driver Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ================== Driver ID (Readonly) ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Driver ID
                    </label>
                    <input
                        className="main-input bg-gray-100 cursor-not-allowed w-full read-only-input"
                        value={driver.driver_id}
                        readOnly
                        disabled
                    />
                </div>

                {/* ================== Name ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter driver name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                    />
                </div>

                {/* ================== Phone ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                    />
                </div>

                {/* ================== Status ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Status
                    </label>
                    <div className="relative">
                        <select
                            className="main-input appearance-none pr-8 w-full"
                            value={form.status}
                            onChange={(e) => update("status", e.target.value)}
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BasicInfoSection;
