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
    isLoading,
    error,
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
            isLoading={isLoading}
            error={error}
        />
    );
};

export default RoutesTable;
