import type { DefaultCellProps } from "../../common/Types/Interfaces";

const DefaultCell = <T extends Record<string, unknown>>({
    row,
    col,
}: DefaultCellProps<T>) => {
    return (
        <td key={String(col.key)} className="p-4 text-center">
            {col.render ? col.render(row) : String(row[col.key as keyof T])}
        </td>
    );
};

export default DefaultCell;
