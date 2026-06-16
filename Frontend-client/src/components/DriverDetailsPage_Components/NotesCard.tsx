import type { NotesCardProps } from "../../common/Types/Interfaces";

const NotesCard = ({ notes }: NotesCardProps) => {
    return (
        <section className="p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] h-full min-h-[150px]">
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
