import type { ContactsSectionProps } from "../../../common/Types/Interfaces";


const ContactsSection = ({ form, update }: ContactsSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Contacts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ================== Email ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">Email</label>
                    <input
                        className="main-input w-full"
                        placeholder="name@example.com"
                        value={form.contact_channels.email}
                        onChange={(e) =>
                            update("contact_channels.email", e.target.value)
                        }
                    />
                </div>

                {/* ================== Facebook ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        Facebook
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="Facebook profile URL"
                        value={form.contact_channels.facebook}
                        onChange={(e) =>
                            update("contact_channels.facebook", e.target.value)
                        }
                    />
                </div>

                {/* ================== WhatsApp ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        WhatsApp
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="WhatsApp number"
                        value={form.contact_channels.whatsapp}
                        onChange={(e) =>
                            update("contact_channels.whatsapp", e.target.value)
                        }
                    />
                </div>

                {/* ================== LinkedIn ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        LinkedIn
                    </label>
                    <input
                        className="main-input w-full"
                        placeholder="LinkedIn profile URL"
                        value={form.contact_channels.linkedin}
                        onChange={(e) =>
                            update("contact_channels.linkedin", e.target.value)
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactsSection;
