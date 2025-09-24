import type { AddressSectionProps } from "../../../common/Types/Interfaces";

const AddressSection = ({ form, update }: AddressSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Address Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ================== Address ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Address
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter address"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                    />
                </div>

                {/* ================== Country ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Country
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter country"
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                    />
                </div>

                {/* ================== City ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">City</label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter city"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
};

export default AddressSection;
