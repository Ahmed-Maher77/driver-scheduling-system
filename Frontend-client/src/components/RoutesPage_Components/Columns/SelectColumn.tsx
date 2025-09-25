import { useRef, useEffect } from "react";
import type { TableColumn, RouteRow, SelectColumnProps } from "../../../common/Types/Interfaces";

export const useSelectColumn = ({
    selected,
    selectedCount,
    allSelected,
    onToggleAll,
    onToggleOne,
}: SelectColumnProps): TableColumn<RouteRow> => {
    const headerCheckboxRef = useRef<HTMLInputElement>(null);

    // Update header checkbox indeterminate state
    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate =
                selectedCount > 0 && !allSelected;
        }
    }, [selectedCount, allSelected]);

    return {
        key: "select",
        label: (
            <input
                ref={headerCheckboxRef}
                type="checkbox"
                className={`checkbox ${
                    selectedCount > 0 && !allSelected ? "indeterminate" : ""
                }`}
                checked={allSelected}
                onChange={onToggleAll}
            />
        ) as unknown as string,
        render: (row) => (
            <input
                type="checkbox"
                className="checkbox"
                checked={!!selected[row.id]}
                onChange={() => onToggleOne(row.id)}
            />
        ),
        align: "center",
    };
};
