import type { TableColumn } from "../../common/Types/Interfaces";

export interface DefaultCellProps<T extends Record<string, unknown>> {
    row: T;
    col: TableColumn<T>;
    alignClass: string;
}

const DefaultCell = <T extends Record<string, unknown>>({
    row,
    col,
    alignClass,
}: DefaultCellProps<T>) => {
    return (
        <td key={String(col.key)} className={`p-4 ${alignClass}`}>
            {col.render ? col.render(row) : String(row[col.key as keyof T])}
        </td>
    );
};

export default DefaultCell;
