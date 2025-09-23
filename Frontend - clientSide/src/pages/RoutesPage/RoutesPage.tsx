import { useEffect, useState } from "react";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import type {
    AddRouteItemProps,
    RouteRow,
    SearchBy,
} from "../../common/Types/Interfaces";
import EditRouteModal from "../../components/RoutesPage_Components/EditRouteModal";
import AddRouteModal from "../../components/RoutesPage_Components/AddRouteModal";
import { exportCsv } from "../../components/RoutesPage_Components/exportCsv";
import RoutesControls from "../../components/RoutesPage_Components/RoutesControls";
import FiltersSection from "../../components/RoutesPage_Components/FiltersSection";
import BulkActionsBar from "../../components/RoutesPage_Components/BulkActionsBar";
import RoutesTable from "../../components/RoutesPage_Components/RoutesTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notify } from "../../utils/functions/notify";

// Demo data
const initialRoutes: RouteRow[] = [
    {
        id: "RT001",
        startLocation: "Warehouse A",
        endLocation: "City Center",
        status: "assigned",
        assignedDriver: { id: "DR001", name: "Ethan Harper" },
        lastDriver: { id: "DR002", name: "ahmed" },
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
        assignedAt: "2025-01-01",
        distance: 18.4,
        distanceUnit: "mile",
        duration: 100,
        timeUnit: "minutes",
        cost: 100,
        currency: "EGP",
        maxSpeed: 120,
        speedUnit: "km/h",
    },
    {
        id: "RT002",
        startLocation: "Warehouse B",
        endLocation: "Suburb North",
        status: "in progress",
        assignedDriver: { id: "DR002", name: "Liam Carter" },
        createdAt: "2025-01-04",
        updatedAt: "2025-01-04",
        assignedAt: "2025-01-04",
        distance: 24.2,
        distanceUnit: "mile",
        duration: 120,
        timeUnit: "minutes",
        cost: 150,
        currency: "EGP",
        maxSpeed: 100,
        speedUnit: "km/h",
    },
    {
        id: "RT003",
        startLocation: "Warehouse C",
        endLocation: "Suburb South",
        status: "unassigned",
        assignedDriver: undefined,
        createdAt: "2025-01-05",
        updatedAt: "2025-01-05",
        assignedAt: "2025-01-05",
        distance: 12.7,
        distanceUnit: "mile",
        duration: 120,
        timeUnit: "minutes",
        cost: 150,
        currency: "EGP",
        maxSpeed: 100,
        speedUnit: "km/h",
    },
];

const RoutesPage = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingRouteId, setEditingRouteId] = useState("");
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [routes, setRoutes] = useState(initialRoutes);
    const [searchBy, setSearchBy] = useState<SearchBy>({
        routeId: "",
        driverName: "",
        status: "",
        duration: "",
    });

    // Sync modal state with URL search params
    useEffect(() => {
        const modal = searchParams.get("modal");
        const routeId = searchParams.get("routeId") || "";

        if (modal === "addRoute") {
            setIsAddModalOpen(true);
            setIsEditModalOpen(false);
            setEditingRouteId("");
            return;
        }
        if (modal === "editRoute" && routeId) {
            setEditingRouteId(routeId);
            setIsEditModalOpen(true);
            setIsAddModalOpen(false);
            return;
        }
        // No modal param → close both
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditingRouteId("");
    }, [searchParams]);

    // Calculate selection state
    const selectedCount = Object.values(selected).filter(Boolean).length;
    const allSelected =
        routes.length > 0 && routes.every((r) => selected[r.id]);

    useEffect(() => {
        // get routes from api
        // setRoutes(newRoutes);
    }, []);

    // Filter Routes based on: routeId, driverName, status, duration
    useEffect(() => {
        // get routes from api
        // setRoutes(newRoutes);
    }, [searchBy]);

    // Add Route
    const addRoute = (routeData: AddRouteItemProps) => {
        const newRoute = {
            startLocation: routeData.startLocation,
            endLocation: routeData.endLocation,
            distance: routeData.distance,
            distanceUnit: routeData.distanceUnit,
            duration: routeData.duration,
            timeUnit: routeData.timeUnit,
            cost: routeData.cost,
            currency: routeData.currency,
            maxSpeed: routeData.maxSpeed,
            speedUnit: routeData.speedUnit,
        };

        // Add route to api
        // addRouteToApi(newRoute);
        // invalidate the routes
        notify("success", "Route added successfully");
    };

    // Delete Route
    const deleteRoute = (id: string) => {
        // delete route from api
        // deleteRouteFromApi(id);
        // invalidate the routes
        notify("success", "Route deleted successfully");
    };

    // View Route Details
    const viewRoute = (id: string) => {
        navigate(`/routes/${id}`);
    };

    // Open Add Route (URL-driven)
    const openAddRoute = () => {
        setSearchParams({ modal: "addRoute" });
    };

    // Open Edit Route (URL-driven)
    const openEditRoute = (id: string) => {
        setSearchParams({ modal: "editRoute", routeId: id });
    };

    // Close any modal: clear params
    const closeModals = () => {
        setSearchParams({});
    };

    // Edit Route (table action)
    const editRoute = (id: string) => {
        const route = routes.find((r) => r.id === id);
        if (route) {
            openEditRoute(route.id);
        }
    };

    // Handle Close Edit Modal
    const handleCloseEditModal = () => {
        closeModals();
    };

    // Handle Close Add Modal
    const handleCloseAddModal = () => {
        closeModals();
    };

    // Export CSV
    const handleExportCsv = () => {
        exportCsv(routes, "routes.csv");
    };

    // Selection functions
    const toggleAll = () => {
        const next = { ...selected };
        const shouldSelectAll = !allSelected;
        routes.forEach((r) => (next[r.id] = shouldSelectAll));
        setSelected(next);
    };

    const toggleOne = (id: string) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const deleteSelectedRoutes = () => {
        const selectedIds = Object.keys(selected).filter((k) => selected[k]);
        if (!selectedIds.length) return;
        // delete selected routes from api
        // deleteSelectedRoutesFromApi(selectedIds);
        // Clear selection
        setSelected({});
        notify("success", "Selected routes deleted successfully");
        // invalidate the routes
    };

    return (
        <div className="Routes-Page main-page py-6 pb-[60px] popup-scrollbar">
            <div className="container">
                <PageHeader title="Route Management" />

                <RoutesControls
                    onExportCsv={handleExportCsv}
                    onAddRoute={openAddRoute}
                />

                <FiltersSection
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters((prev) => !prev)}
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                />

                <main className="white-bg p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out">
                    <BulkActionsBar
                        selectedCount={selectedCount}
                        onDeleteSelected={deleteSelectedRoutes}
                    />

                    <RoutesTable
                        routes={routes}
                        selected={selected}
                        selectedCount={selectedCount}
                        allSelected={allSelected}
                        onToggleAll={toggleAll}
                        onToggleOne={toggleOne}
                        onViewRoute={viewRoute}
                        onEditRoute={editRoute}
                        onDeleteRoute={deleteRoute}
                    />
                </main>
            </div>

            <EditRouteModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                routeId={editingRouteId}
            />

            <AddRouteModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onAddRoute={addRoute}
            />
        </div>
    );
};

export default RoutesPage;
