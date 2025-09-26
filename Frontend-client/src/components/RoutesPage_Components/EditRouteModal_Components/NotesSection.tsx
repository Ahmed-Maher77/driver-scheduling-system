import React from "react";
import type { RouteNotesSectionProps } from "../../../common/Types/Interfaces";

const NotesSection: React.FC<RouteNotesSectionProps> = ({
    notes,
    onNotesChange,
    notesError,
}) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">
                    Notes <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    placeholder="Add any additional notes about this route..."
                    className={`main-input w-full min-h-[100px] resize-y ${
                        notesError ? "border-red-500" : ""
                    }`}
                    rows={4}
                />
                {notesError && (
                    <p className="text-red-500 text-xs mt-1">{notesError}</p>
                )}
            </div>
        </div>
    );
};

export default NotesSection;
