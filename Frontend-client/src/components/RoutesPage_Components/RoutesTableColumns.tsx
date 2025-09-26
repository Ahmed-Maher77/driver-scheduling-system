import type {
    TableColumn,
    RouteRow,
    RoutesTableProps,
} from "../../common/Types/Interfaces";
import { useSelectColumn } from "./Columns/SelectColumn";
import { statusColumn } from "./Columns/StatusColumn";
import { driverColumn } from "./Columns/DriverColumn";
import { locationColumn } from "./Columns/LocationColumn";
import { distanceColumn } from "./Columns/DistanceColumn";
import { useActionsColumn } from "./Columns/ActionsColumn";

export const useRoutesTableColumns = ({
    selected,
    selectedCount,
    allSelected,
    onToggleAll,
    onToggleOne,
    onViewRoute,
    onEditRoute,
    onDeleteRoute,
}: Pick<
    RoutesTableProps,
    | "selected"
    | "selectedCount"
    | "allSelected"
    | "onToggleAll"
    | "onToggleOne"
    | "onViewRoute"
    | "onEditRoute"
    | "onDeleteRoute"
>) => {
    // Get individual columns
    const selectColumn = useSelectColumn({
        selected,
        selectedCount,
        allSelected,
        onToggleAll,
        onToggleOne,
    });

    const actionsColumn = useActionsColumn({
        onViewRoute,
        onEditRoute,
        onDeleteRoute,
    });

    // Combine all columns
    const columns: TableColumn<RouteRow>[] = [
        selectColumn,
        { key: "route_id", label: "Route ID", align: "left" },
        locationColumn,
        distanceColumn,
        statusColumn,
        driverColumn,
        { key: "assigned_at", label: "Assigned At", align: "center" },
        actionsColumn,
    ];

    return columns;
};
