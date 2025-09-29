import type { ContactInfoCardProps } from "../../common/Types/Interfaces";
import InfoRow from "./InfoRow";

const toAbsoluteUrl = (url?: string | null) => {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
};

const toWhatsAppLink = (phone?: string | null) => {
    if (!phone) return null;
    const digits = phone.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : null;
};

const ContactInfoCard = ({
    phone,
    email,
    whatsapp,
    linkedin,
    facebook,
}: ContactInfoCardProps) => {
    // Filter out empty contact channels
    const contactChannels = [
        {
            key: "phone",
            label: "Phone",
            value: phone,
            href: null,
        },
        {
            key: "email",
            label: "Email",
            value: email,
            href: email ? `mailto:${email}` : null,
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            value: whatsapp,
            href: toWhatsAppLink(whatsapp),
        },
        {
            key: "linkedin",
            label: "LinkedIn",
            value: linkedin,
            href: toAbsoluteUrl(linkedin),
        },
        {
            key: "facebook",
            label: "Facebook",
            value: facebook,
            href: toAbsoluteUrl(facebook),
        },
    ].filter((channel) => channel.value && channel.value.trim() !== "");

    // Don't render the card if no contact channels exist
    if (contactChannels.length === 0) {
        return null;
    }

    return (
        <div className="white-bg p-4 rounded-lg shadow-md">
            {/* ================== Title ================== */}
            <h5 className="font-semibold mb-2 text-xs md:text-base lg:text-lg">
                Contact Information
            </h5>

            {/* ================== Info Rows ================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {contactChannels.map((channel) => (
                    <InfoRow
                        key={channel.key}
                        label={channel.label}
                        value={channel.value}
                        href={channel.href}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContactInfoCard;
