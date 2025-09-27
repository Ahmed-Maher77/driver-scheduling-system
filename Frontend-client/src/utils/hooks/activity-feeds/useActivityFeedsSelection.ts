import { useState } from "react";
import type {
    UseActivityFeedsSelectionProps,
    UseActivityFeedsSelectionReturn,
} from "../../../common/Types/Interfaces";

const useActivityFeedsSelection = ({
    activityFeeds,
}: UseActivityFeedsSelectionProps): UseActivityFeedsSelectionReturn => {
    const [selected, setSelected] = useState<Record<string, boolean>>({});

    const selectedCount = Object.values(selected).filter(Boolean).length;
    const allSelected =
        activityFeeds.length > 0 && selectedCount === activityFeeds.length;

    const toggleAll = () => {
        if (allSelected) {
            setSelected({});
        } else {
            const newSelected: Record<string, boolean> = {};
            activityFeeds.forEach((feed) => {
                if (feed._id) {
                    newSelected[feed._id] = true;
                }
            });
            setSelected(newSelected);
        }
    };

    const toggleOne = (id: string) => {
        setSelected((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return {
        selected,
        selectedCount,
        allSelected,
        toggleAll,
        toggleOne,
    };
};

export default useActivityFeedsSelection;
