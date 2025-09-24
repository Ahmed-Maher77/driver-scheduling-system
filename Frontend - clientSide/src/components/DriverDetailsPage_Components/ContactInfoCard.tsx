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
    return (
        <div className="white-bg p-4 rounded-lg shadow-md">
            {/* ================== Title ================== */}
            <h5 className="font-semibold mb-2 text-xs md:text-base lg:text-lg">
                Contact Information
            </h5>

            {/* ================== Info Rows ================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {/* Phone */}
                <InfoRow label="Phone" value={phone || "-"} />
                {/* Email */}
                <InfoRow
                    label="Email"
                    value={email || "-"}
                    href={email ? `mailto:${email}` : null}
                />
                {/* WhatsApp */}
                <InfoRow
                    label="WhatsApp"
                    value={whatsapp || "-"}
                    href={toWhatsAppLink(whatsapp)}
                />
                {/* LinkedIn */}
                <InfoRow
                    label="LinkedIn"
                    value={linkedin || "-"}
                    href={toAbsoluteUrl(linkedin)}
                />
                {/* Facebook */}
                <InfoRow
                    label="Facebook"
                    value={facebook || "-"}
                    href={toAbsoluteUrl(facebook)}
                />
            </div>
        </div>
    );
};

export default ContactInfoCard;
