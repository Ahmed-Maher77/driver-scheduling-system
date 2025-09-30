import type { ContactInfoProps } from "../../common/Types/Interfaces";

const ContactInfo = ({
    location = "Cairo, Egypt",
    email = "ahmedmaher.dev1@gmail.com",
    whatsapp = "+201096528514",
    linkedin = "https://www.linkedin.com/in/ahmed-maher-algohary",
    facebook = "https://web.facebook.com/profile.php?id=100012154268952",
}: ContactInfoProps) => {
    const formattedWhatsApp = whatsapp.startsWith("+20")
        ? whatsapp
        : `+20${whatsapp.replace(/^20/, "")}`;

    type Item = {
        key: string;
        icon: string;
        label: string;
        value: string;
        href?: string;
    };

    const items: Item[] = [
        {
            key: "location",
            icon: "📍",
            label: "Location",
            value: location,
        },
        {
            key: "email",
            icon: "✉️",
            label: "Email",
            value: email,
            href: `mailto:${email}`,
        },
        {
            key: "whatsapp",
            icon: "💬",
            label: "WhatsApp",
            value: formattedWhatsApp,
            href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
        },
        {
            key: "linkedin",
            icon: "🔗",
            label: "LinkedIn",
            value: "linkedin.com/in/ahmed-maher-algohary",
            href: linkedin,
        },
        {
            key: "facebook",
            icon: "📘",
            label: "Facebook",
            value: "facebook.com/ahmedmaher.algohary",
            href: facebook,
        },
    ];

    return (
        <aside className="contact-info">
            <h2 className="section-title">Contact Information</h2>
            <ul className="info-list">
                {items.map(({ key, icon, label, value, href }) => (
                    <li key={key} className="info-item">
                        <div className="icon">{icon}</div>
                        <div className="details">
                            <span className="label">{label}</span>
                            {href ? (
                                <a
                                    className="value underline-hover w-fit"
                                    href={href}
                                >
                                    {value}
                                </a>
                            ) : (
                                <span className="value">{value}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default ContactInfo;
