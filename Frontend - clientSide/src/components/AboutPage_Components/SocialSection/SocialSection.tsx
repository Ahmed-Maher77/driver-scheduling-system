import React from "react";

interface SocialLink {
    name: string;
    url: string;
    icon: string;
    className: string;
}

const SocialSection = () => {
    const socialLinks: SocialLink[] = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/ahmed-maher-algohary",
            icon: "fa-brands fa-linkedin-in",
            className: "linkedin",
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/+201096528514",
            icon: "fa-brands fa-whatsapp",
            className: "whatsapp",
        },
        {
            name: "Facebook",
            url: "https://web.facebook.com/profile.php?id=100012154268952",
            icon: "fa-brands fa-facebook",
            className: "facebook",
        },
    ];

    return (
        <div className="social-section">
            <h3 className="section-title">Let's Connect</h3>
            <div className="social-links">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-link ${link.className}`}
                    >
                        <i className={link.icon}></i>
                        <span>{link.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialSection;
