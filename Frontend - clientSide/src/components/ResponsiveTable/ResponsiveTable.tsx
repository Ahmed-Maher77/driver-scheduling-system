import "./ResponsiveTable.scss";
import type {
    ResponsiveTableProps,
    TableColumn,
    TableAlign,
} from "../../common/Types/Interfaces";
import AssignedDriverCell from "./AssignedDriverCell";
import DetailsCell from "./DetailsCell";
import DefaultCell from "./DefaultCell";

const getAlignClass = (align?: TableAlign, fallback: TableAlign = "center") =>
    align === "left"
        ? "text-left"
        : align === "right"
        ? "text-right"
        : fallback === "left"
        ? "text-left"
        : fallback === "right"
        ? "text-right"
        : "text-center";

function buildColumns<T extends Record<string, unknown>>(
    columns: TableColumn<T>[] | undefined,
    headers: string[] | undefined,
    rows: T[],
    defaultAlign: TableAlign
): TableColumn<T>[] {
    if (columns && columns.length) return columns;
    const source =
        headers || (rows[0] ? (Object.keys(rows[0]) as string[]) : []);
    return source.map((key) => ({
        key,
        label: String(key).charAt(0).toUpperCase() + String(key).slice(1),
        align: defaultAlign,
    }));
}

const ResponsiveTable = <T extends Record<string, unknown>>({
    headers,
    rows,
    columns,
    stickyHeader = true,
    className = "",
    tableClassName = "",
    cellAlign = "center",
    seeDetails = false,
}: ResponsiveTableProps<T>) => {
    const effectiveColumns = buildColumns<T>(columns, headers, rows, cellAlign);

    return (
        <div
            className={`responsive-table-wrapper table-responsive mt-4 ${className}`}
        >
            <table className={`responsive-table w-full ${tableClassName}`}>
                {/* Header */}
                <thead className={stickyHeader ? "gray-bg-l" : undefined}>
                    <tr>
                        {effectiveColumns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={`p-4 ${getAlignClass(
                                    col.align,
                                    cellAlign
                                )}`}
                            >
                                {col.label ??
                                    String(col.key).charAt(0).toUpperCase() +
                                        String(col.key).slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {rows.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {effectiveColumns.map((col, colIdx) => {
                                if (String(col.key) === "assignedDriver") {
                                    const cell = (
                                        <AssignedDriverCell
                                            key={String(col.key)}
                                            cellKey={String(col.key)}
                                            driver={(row as any).assignedDriver}
                                        />
                                    );
                                    if (cell) return cell;
                                }

                                if (
                                    colIdx === effectiveColumns.length - 1 &&
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

                                const alignClass = getAlignClass(
                                    col.align,
                                    cellAlign
                                );
                                return (
                                    <DefaultCell<T>
                                        key={String(col.key)}
                                        row={row}
                                        col={col}
                                        alignClass={alignClass}
                                    />
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResponsiveTable;
