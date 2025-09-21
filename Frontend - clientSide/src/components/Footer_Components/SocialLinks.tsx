import "./SocialLinks.scss";

const SocialLinks = () => {
    return (
        <div className="footer-right">
            <div className="social-links">
                <a
                    href="https://www.linkedin.com/in/ahmed-maher-algohary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-icon linkedin"
                    aria-label="LinkedIn"
                >
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>

                <a
                    href="https://github.com/Ahmed-Maher77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-icon github"
                    aria-label="GitHub"
                >
                    <i className="fa-brands fa-github"></i>
                </a>

                <a
                    href="https://wa.me/+201096528514"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-icon whatsapp"
                    aria-label="WhatsApp"
                >
                    <i className="fa-brands fa-whatsapp"></i>
                </a>
            </div>
        </div>
    );
};

export default SocialLinks;
