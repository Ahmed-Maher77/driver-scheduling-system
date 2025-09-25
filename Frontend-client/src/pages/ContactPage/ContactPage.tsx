import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import "./ContactPage.scss";
import ContactInfo from "../../components/ContactPage_Components/ContactInfo";
import ContactForm from "../../components/ContactPage_Components/ContactForm";
import ContactMap from "../../components/ContactPage_Components/ContactMap";

const ContactPage = () => {
    return (
        <div className="Contact-Page main-page py-5 pb-[60px]">
            <div className="container">
                <PageHeader title="Contact Us" />

                <div className="contact-content">
                    <ContactInfo />
                    <ContactForm />
                </div>
                <ContactMap className="h-[420px] white-bg rounded-lg shadow-md p-5 mt-8" />
            </div>
        </div>
    );
};

export default ContactPage;
