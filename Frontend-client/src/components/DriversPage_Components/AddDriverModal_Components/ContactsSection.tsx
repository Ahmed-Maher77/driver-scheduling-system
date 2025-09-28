import type { ContactsSectionProps } from "../../../common/Types/Interfaces";

const ContactsSection = ({ form, update }: ContactsSectionProps) => {
    // Filter out empty contact channels
    const contactChannels = [
        {
            key: "email",
            label: "Email",
            placeholder: "name@example.com",
            value: form.contact_channels.email,
        },
        {
            key: "facebook",
            label: "Facebook",
            placeholder: "Facebook profile URL",
            value: form.contact_channels.facebook,
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            placeholder: "WhatsApp number",
            value: form.contact_channels.whatsapp,
        },
        {
            key: "linkedin",
            label: "LinkedIn",
            placeholder: "LinkedIn profile URL",
            value: form.contact_channels.linkedin,
        },
    ].filter((channel) => channel.value && channel.value.trim() !== "");

    // Don't render the section if no contact channels exist
    if (contactChannels.length === 0) {
        return null;
    }

    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Contacts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactChannels.map((channel) => (
                    <div key={channel.key} className="main-input-container">
                        <label className="block gray-c-d text-sm mb-2">
                            {channel.label}
                        </label>
                        <input
                            className="main-input w-full"
                            placeholder={channel.placeholder}
                            value={channel.value}
                            onChange={(e) =>
                                update(
                                    `contact_channels.${channel.key}`,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactsSection;
