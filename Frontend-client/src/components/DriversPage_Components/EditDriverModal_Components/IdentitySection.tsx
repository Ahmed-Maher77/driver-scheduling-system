import { useState } from "react";
import type { IdentitySectionProps } from "../../../common/Types/Interfaces";
import DocumentImageDisplay from "./DocumentImageDisplay";
import ImageModal from "./ImageModal";
import FormField from "./FormField";
import SelectField from "./SelectField";

const IdentitySection = ({ form, update }: IdentitySectionProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageTitle, setImageTitle] = useState<string>("");

    const handleImageClick = (imageUrl: string, title: string) => {
        setSelectedImage(imageUrl);
        setImageTitle(title);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setImageTitle("");
    };

    // Field configuration for form inputs
    const formFields = [
        {
            key: "gender",
            label: "Gender",
            type: "select",
            value: form.gender || "",
            options: [
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
            ],
            onChange: (value: string) => update("gender", value),
        },
        {
            key: "date_of_birth",
            label: "Date of Birth",
            type: "date",
            value: form.date_of_birth
                ? new Date(form.date_of_birth).toISOString().split("T")[0]
                : "",
            onChange: (value: string) => update("date_of_birth", value),
        },
    ];

    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Identity Information</h4>

            <div className="flex flex-col gap-4">
                {/* ================== National ID (Image Display) ================== */}
                <FormField label="National ID">
                    <DocumentImageDisplay
                        imageUrl={
                            form.national_id &&
                            typeof form.national_id === "string"
                                ? form.national_id
                                : null
                        }
                        title="National ID"
                        placeholderIcon="fa-solid fa-file-image"
                        placeholderText="No National ID uploaded"
                        onImageClick={handleImageClick}
                    />
                </FormField>

                {/* ================== Form Fields ================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {formFields.map((field) => (
                        <FormField key={field.key} label={field.label}>
                            {field.type === "select" ? (
                                <SelectField
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={field.options || []}
                                />
                            ) : (
                                <input
                                    className="main-input w-full"
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                />
                            )}
                        </FormField>
                    ))}
                </div>
            </div>

            {/* ================== Image Modal ================== */}
            <ImageModal
                isOpen={!!selectedImage}
                imageUrl={selectedImage || ""}
                title={imageTitle}
                onClose={closeModal}
            />
        </section>
    );
};

export default IdentitySection;
