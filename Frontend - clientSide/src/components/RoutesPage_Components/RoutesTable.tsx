import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useRoutesTableColumns } from "./RoutesTableColumns";
import type { RouteRow, RoutesTableProps } from "../../common/Types/Interfaces";

const RoutesTable = ({
    routes,
    selected,
    selectedCount,
    allSelected,
    onToggleAll,
    onToggleOne,
    onViewRoute,
    onEditRoute,
    onDeleteRoute,
}: RoutesTableProps) => {
    const columns = useRoutesTableColumns({
        selected,
        selectedCount,
        allSelected,
        onToggleAll,
        onToggleOne,
        onViewRoute,
        onEditRoute,
        onDeleteRoute,
    });

    return (
        <ResponsiveTable<RouteRow>
            columns={columns}
            rows={routes}
            stickyHeader
            tableClassName="w-full"
            cellAlign="center"
        />
    );
};

export default RoutesTable;
