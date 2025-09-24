import type { ContactChannelsSectionProps } from "../../../common/Types/Interfaces";

const ContactChannelsSection = ({
    form,
    update,
}: ContactChannelsSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Contact Channels</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ================== Email ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">Email</label>
                    <input
                        className="main-input w-full"
                        placeholder="Enter email"
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
                        placeholder="Enter Facebook profile"
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
                        placeholder="Enter WhatsApp number"
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
                        placeholder="Enter LinkedIn profile"
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

export default ContactChannelsSection;
