import "./ResponsiveTable.scss";
import type {
    BuildColumnsProps,
    ResponsiveTableProps,
    TableColumn,
} from "../../common/Types/Interfaces";
import AssignedDriverCell from "./AssignedDriverCell";
import DetailsCell from "./DetailsCell";
import DefaultCell from "./DefaultCell";
import { useLocation } from "react-router-dom";
import AnimatedTableRow from "../../common/Animations/AnimatedTableRow/AnimatedTableRow";

function buildColumns<T extends Record<string, unknown>>({
    columns,
    headers,
    rows,
}: BuildColumnsProps<T>): TableColumn<T>[] {
    // If columns are provided, use them
    if (columns?.length) return columns;

    // Determine column keys from headers or first row
    const columnKeys = headers || (rows[0] ? Object.keys(rows[0]) : []);

    // Create simple columns with capitalized labels
    return columnKeys.map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
}

const ResponsiveTable = <T extends Record<string, unknown>>({
    headers,
    rows,
    columns,
    stickyHeader = true,
    className = "",
    tableClassName = "",
    seeDetails = false,
    isLoading = false,
    error = null,
}: ResponsiveTableProps<T>) => {
    const isActivityFeedsPage =
        useLocation().pathname.includes("/activity-feeds");
    const effectiveColumns = buildColumns<T>({ columns, headers, rows });
    return (
        <div
            className={`responsive-table-wrapper table-responsive mt-4 ${className}`}
        >
            {/* ================== Loading ================== */}
            {isLoading && !isActivityFeedsPage && (
                <div className="loading-spinner text-center py-6 gray-c text-lg">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            )}

            {/* ================== Error ================== */}
            {error && (
                <div className="error-message text-center py-6 gray-c text-lg">
                    <i className="fa-solid fa-circle-exclamation red-c"></i>
                    {error}
                </div>
            )}

            {/* ================== Table ================== */}
            <table className={`responsive-table w-full ${tableClassName}`}>
                {/* Table Header */}
                <thead className={stickyHeader ? "gray-bg-l" : undefined}>
                    <tr>
                        {effectiveColumns.map((col) => (
                            <th
                                key={String(col.key)}
                                className="p-4 text-center"
                            >
                                {col.label ??
                                    String(col.key).charAt(0).toUpperCase() +
                                        String(col.key).slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {!isLoading && rows?.length <= 0 ? (
                        <tr>
                            <td
                                colSpan={effectiveColumns.length}
                                className="p-4 text-center text-lg pt-10"
                            >
                                No data found
                            </td>
                        </tr>
                    ) : (
                        rows?.map((row, rowIdx) => (
                            <AnimatedTableRow key={rowIdx} index={rowIdx}>
                                {effectiveColumns.map((col, colIdx) => {
                                    // Assigned Driver Cell
                                    if (String(col.key) === "assignedDriver") {
                                        const cell = (
                                            <AssignedDriverCell
                                                key={String(col.key)}
                                                cellKey={String(col.key)}
                                                driver={
                                                    (row as any).assignedDriver
                                                }
                                            />
                                        );
                                        if (cell) return cell;
                                    }

                                    // Details Cell
                                    if (
                                        colIdx ===
                                            effectiveColumns.length - 1 &&
                                        seeDetails
                                    ) {
                                        return (
                                            <DetailsCell
                                                key={`details-${String(
                                                    (row as any).id
                                                )}`}
                                                id={String((row as any).id)}
                                            />
                                        );
                                    }

                                    // Default Cell
                                    return (
                                        <DefaultCell<T>
                                            key={String(col.key)}
                                            row={row}
                                            col={col}
                                        />
                                    );
                                })}
                            </AnimatedTableRow>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ResponsiveTable;
