import type { FormEvent } from "react";
import { useState } from "react";
import { notify } from "../../utils/functions/notify";

type ContactFormProps = {
    onSubmitSuccess?: () => void;
};

const ContactForm = ({ onSubmitSuccess }: ContactFormProps) => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { name, email, subject, message } = formValues;
        if (!name || !email || !subject || !message) {
            notify("warning", "Please fill in all fields.");
            return;
        }
        notify("success", "Your message has been sent successfully.");
        setFormValues({ name: "", email: "", subject: "", message: "" });
        onSubmitSuccess?.();
    };

    type Field = {
        key: keyof typeof formValues;
        label: string;
        type?: string;
        placeholder: string;
        as?: "input" | "textarea";
        rows?: number;
        grid?: "half" | "full";
    };

    const fields: Field[] = [
        {
            key: "name",
            label: "Your Name",
            type: "text",
            placeholder: "Enter your name",
            as: "input",
            grid: "half",
        },
        {
            key: "email",
            label: "Your Email",
            type: "email",
            placeholder: "Enter your email",
            as: "input",
            grid: "half",
        },
        {
            key: "subject",
            label: "Subject",
            type: "text",
            placeholder: "Enter the subject",
            as: "input",
            grid: "full",
        },
        {
            key: "message",
            label: "Your Message",
            placeholder: "Enter your message",
            as: "textarea",
            rows: 6,
            grid: "full",
        },
    ];

    return (
        <section className="contact-form">
            <h2 className="section-title">Get in Touch</h2>
            <p className="subtitle">
                I'm always open to discussing new projects, creative ideas, or
                opportunities.
            </p>
            <form onSubmit={handleSubmit} className="form">
                <div className="grid">
                    {fields
                        .filter((f) => f.grid === "half")
                        .map(
                            ({
                                key,
                                label,
                                type = "text",
                                placeholder,
                                as = "input",
                            }) => (
                                <div
                                    key={key}
                                    className="field main-input-container"
                                >
                                    <label htmlFor={key}>{label}</label>
                                    {as === "input" ? (
                                        <input
                                            id={key}
                                            name={key}
                                            type={type}
                                            placeholder={placeholder}
                                            className="main-input"
                                            value={formValues[key]}
                                            onChange={handleChange}
                                        />
                                    ) : null}
                                </div>
                            )
                        )}
                </div>

                {fields
                    .filter((f) => f.grid === "full")
                    .map(
                        ({
                            key,
                            label,
                            type = "text",
                            placeholder,
                            as = "input",
                            rows,
                        }) => (
                            <div
                                key={key}
                                className="field main-input-container"
                            >
                                <label htmlFor={key}>{label}</label>
                                {as === "textarea" ? (
                                    <textarea
                                        id={key}
                                        name={key}
                                        placeholder={placeholder}
                                        rows={rows}
                                        className="main-input"
                                        value={formValues[key]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        id={key}
                                        name={key}
                                        type={type}
                                        placeholder={placeholder}
                                        className="main-input"
                                        value={formValues[key]}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        )
                    )}

                <button className="submit-btn" type="submit">
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default ContactForm;
