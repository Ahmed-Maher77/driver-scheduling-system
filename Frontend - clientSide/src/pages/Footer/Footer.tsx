import "./Footer.scss";
import {
    FooterInfo,
    SocialLinks,
    FooterBottom,
} from "../../components/Footer_Components";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-content">
                    <FooterInfo />
                    <SocialLinks />
                </div>
                <FooterBottom />
            </div>
        </footer>
    );
};

export default Footer;
