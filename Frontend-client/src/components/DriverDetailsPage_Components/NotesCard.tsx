import type { NotesCardProps } from "../../common/Types/Interfaces";

const NotesCard = ({ notes }: NotesCardProps) => {
    return (
        <section className="white-bg p-4 rounded-lg shadow-md">
            {/* ================== Title ================== */}
            <h4 className="font-semibold mb-3">Notes</h4>

            {/* ================== Notes Content ================== */}
            <p className="gray-c text-xs md:text-sm leading-6 whitespace-pre-line">
                {notes || "No notes provided."}
            </p>
        </section>
    );
};

export default NotesCard;
