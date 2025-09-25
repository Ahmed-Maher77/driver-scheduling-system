import "./FooterBottom.scss";

const FooterBottom = () => {
    return (
        <div className="footer-bottom">
            <div className="footer-bottom-content">
                <p className="copyright">
                    © 2025 <strong>DRB Internship Program</strong>. All rights
                    reserved.
                </p>
                <p className="developer-credit">
                    Designed & Developed by{" "}
                    <a
                        href="https://ahmedmaher-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="developer-link underline-hover"
                    >
                        Ahmed Maher
                    </a>
                </p>
            </div>
        </div>
    );
};

export default FooterBottom;
