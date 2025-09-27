import type { TableColumn, RouteRow, ActionsColumnProps } from "../../../common/Types/Interfaces";

export const useActionsColumn = ({
    onViewRoute,
    onEditRoute,
    onDeleteRoute,
}: ActionsColumnProps): TableColumn<RouteRow> => ({
    key: "actions",
    label: "Actions",
    render: (row) => (
        <div className="flex items-center gap-3 justify-center">
            {/* View Button */}
            <button
                title="View"
                className="blue-c hover-blue-c cursor-pointer"
                onClick={() => onViewRoute(row.route_id || "")}
            >
                <i className="fa-solid fa-eye cursor-pointer"></i>
            </button>

            {/* Edit Button */}
            <button
                title="Edit"
                className="blue-c hover-blue-c cursor-pointer"
                onClick={() => onEditRoute(row.route_id || "")}
            >
                <i className="fa-solid fa-pen"></i>
            </button>

            {/* Delete Button */}
            <button
                title="Delete"
                className="red-c hover-red-c cursor-pointer"
                onClick={() => onDeleteRoute(row.route_id || "")}
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    ),
    align: "center",
});
