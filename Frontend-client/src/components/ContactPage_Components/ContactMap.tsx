import type { ContactMapProps } from "../../common/Types/Interfaces";


const DEFAULT_MAP =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110541.62799260922!2d31.22430025!3d30.0594838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c6b64a3a6f%3A0x9b2f0b98b5ebd9e7!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1699999999999!5m2!1sen!2seg";

const ContactMap = ({
    title = "Cairo Map",
    src = DEFAULT_MAP,
    className = "",
}: ContactMapProps) => {
    return (
        <section className={`contact-map ${className}`}>
            <iframe
                title={title}
                src={src}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />
        </section>
    );
};

export default ContactMap;
