type RouteNotesProps = { notes?: string };

const RouteNotes = ({ notes = "" }: RouteNotesProps) => {
    return (
        <section className="route-notes w-full mb-5 flex flex-col">
            <h3 className="text-xl font-bold mb-5 text-gray-800 pl-1 shrink-0">Notes</h3>
            <div className="p-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex-grow min-h-[120px]">
                <p className="text-[15px] text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {notes || "No notes provided."}
                </p>
            </div>
        </section>
    );
};

export default RouteNotes;
