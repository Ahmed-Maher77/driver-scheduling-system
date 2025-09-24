import type { DriverForm } from "../../../common/Types/Interfaces";

interface NotesSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

const NotesSection = ({ form, update }: NotesSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Notes</h4>
            <div className="main-input-container">
                {/* Notes */}
                <label className="block gray-c-d text-sm mb-2">
                    Notes <span className="text-gray-400">(Optional)</span>
                </label>

                {/* Notes Textarea */}
                <textarea
                    className="main-input w-full min-h-[100px] resize-y"
                    rows={4}
                    placeholder="Add any additional notes about this driver..."
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                />
            </div>
        </section>
    );
};

export default NotesSection;
