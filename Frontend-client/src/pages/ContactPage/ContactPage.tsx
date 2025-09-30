import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import "./ContactPage.scss";
import ContactInfo from "../../components/ContactPage_Components/ContactInfo";
import ContactForm from "../../components/ContactPage_Components/ContactForm";
import ContactMap from "../../components/ContactPage_Components/ContactMap";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const ContactPage = () => {
    return (
        <AnimatedPage>
            <div className="Contact-Page main-page py-5 pb-[60px]">
                <div className="container">
                    <AnimatedComponent
                        delay={0.1}
                        type="slide"
                        direction="down"
                    >
                        <PageHeader title="Contact Us" />
                    </AnimatedComponent>

                    <div className="contact-content">
                        <AnimatedComponent
                            delay={0.2}
                            type="fade"
                            className="w-full max-w-[700px] mx-auto xl:mx-0 xl:max-w-[500px]"
                        >
                            <ContactInfo />
                        </AnimatedComponent>
                        <AnimatedComponent
                            delay={0.3}
                            type="slide"
                            direction="up"
                            className="w-full"
                        >
                            <ContactForm />
                        </AnimatedComponent>
                    </div>
                    <AnimatedComponent delay={0.4} type="scale">
                        <ContactMap className="h-[420px] white-bg rounded-lg shadow-md p-5 mt-8" />
                    </AnimatedComponent>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ContactPage;
