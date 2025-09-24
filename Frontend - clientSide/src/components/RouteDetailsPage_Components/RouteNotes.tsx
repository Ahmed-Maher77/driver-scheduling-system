type RouteNotesProps = { notes?: string };

const RouteNotes = ({ notes = "" }: RouteNotesProps) => {
    return (
        <section className="route-notes white-bg rounded-lg shadow-md p-5 mb-5 w-full">
            <h3 className="text-lg font-semibold mb-3">Notes</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap min-h-10">
                {notes || "No notes provided."}
            </p>
        </section>
    );
};

export default RouteNotes;
