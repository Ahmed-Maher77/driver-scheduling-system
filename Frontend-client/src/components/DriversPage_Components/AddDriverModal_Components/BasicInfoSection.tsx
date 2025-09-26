import type { DriverForm } from "../../../common/Types/Interfaces";

interface BasicInfoSectionProps {
    form: DriverForm;
    errors: Record<string, string>;
    update: (path: string, value: string | File | null) => void;
}

const BasicInfoSection = ({ form, errors, update }: BasicInfoSectionProps) => {
    return (
        <section>
            <h4 className="font-semibold mb-2">Basic Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* ================== Name ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["name"] ? "border-red-500" : ""
                        }`}
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                    />
                    {errors["name"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["name"]}
                        </p>
                    )}
                </div>

                {/* ================== Phone ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["phone"] ? "border-red-500" : ""
                        }`}
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                    />
                    {errors["phone"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["phone"]}
                        </p>
                    )}
                </div>

                {/* ================== Status ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Status
                    </label>
                    <div className="relative">
                        <select
                            className="main-input appearance-none pr-10 w-full"
                            value={form.status}
                            onChange={(e) => update("status", e.target.value)}
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                        <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {/* ================== Gender ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            className={`main-input appearance-none w-full pr-10 ${
                                errors["gender"] ? "border-red-500" : ""
                            }`}
                            value={form.gender}
                            onChange={(e) => update("gender", e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    {errors["gender"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["gender"]}
                        </p>
                    )}
                </div>

                {/* ================== Date of Birth ================== */}
                <div className="main-input-container sm:col-span-2 lg:col-span-1">
                    <label className="block gray-c-d text-sm mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={`main-input w-full ${
                            errors["date_of_birth"] ? "border-red-500" : ""
                        }`}
                        type="date"
                        placeholder="YYYY-MM-DD"
                        value={form.date_of_birth}
                        onChange={(e) => update("date_of_birth", e.target.value)}
                    />
                    {errors["date_of_birth"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["date_of_birth"]}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BasicInfoSection;
