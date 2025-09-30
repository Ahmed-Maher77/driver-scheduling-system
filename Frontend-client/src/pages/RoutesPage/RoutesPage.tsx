import { useEffect, useState } from "react";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import type {
    AddRouteItemProps,
    SearchBy,
} from "../../common/Types/Interfaces";
import EditRouteModal from "../../components/RoutesPage_Components/EditRouteModal";
import AddRouteModal from "../../components/RoutesPage_Components/AddRouteModal";
import { exportCsv } from "../../components/RoutesPage_Components/exportCsv";
import RoutesControls from "../../components/RoutesPage_Components/RoutesControls";
import FiltersSection from "../../components/RoutesPage_Components/FiltersSection";
import BulkActionsBar from "../../components/BulkActionsBar/BulkActionsBar";
import RoutesTable from "../../components/RoutesPage_Components/RoutesTable";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notify } from "../../utils/functions/notify";
import Pagination from "../../components/Pagination/Pagination";
import useGetAllRoutes from "../../utils/hooks/api/useGetAllRoutes";
import { extractDate } from "../../utils/functions/formatDate";
import useAddNewRoute from "../../utils/hooks/api/useAddNewRoute";
import useDeleteRoute from "../../utils/hooks/api/useDeleteRoute";
import useDeleteSelectedRoutes from "../../utils/hooks/api/useDeleteSelectedRoutes";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const RoutesPage = () => {
    // Pagination Info
    const [paginationInfo, setPaginationInfo] = useState({
        pageNumber: 1,
        totalPages: 1,
        totalDocs: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    // Filters - Initialize from URL params
    const [searchBy, setSearchBy] = useState<SearchBy>(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");
        return {
            routeIdOrDriverName: urlParams.get("routeIdOrDriverName") || "",
            status:
                status === "assigned" ||
                status === "unassigned" ||
                status === "in progress"
                    ? status
                    : "",
            duration: urlParams.get("duration") || "",
        };
    });

    // Fetch Routes
    const {
        data: fetchedRoutesData,
        isLoading,
        error,
    } = useGetAllRoutes({
        pageNumber: paginationInfo.pageNumber,
        limit: 10,
        filters: searchBy,
    });
    const [routes] = useState<any[]>([]);
    // Add Route
    const { addRoute, isPending, error: addRouteError } = useAddNewRoute();
    // Filters
    const [showFilters, setShowFilters] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingRouteId, setEditingRouteId] = useState("");
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingRouteId, setDeletingRouteId] = useState("");
    const [isExportingCsv, setIsExportingCsv] = useState(false);
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Delete hooks
    const { deleteRoute, isPending: isDeletingRoute } = useDeleteRoute();
    const { deleteSelectedRoutes, isPending: isBulkDeleting } =
        useDeleteSelectedRoutes();

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
        fetchedRoutesData?.data?.length > 0 &&
        fetchedRoutesData.data.every((r: any) => selected[r.route_id]);

    useEffect(() => {
        // get drivers from api
        if (fetchedRoutesData) {
            // Set the pagination info
            setPaginationInfo({
                pageNumber: fetchedRoutesData?.currentPage || 1,
                totalPages: fetchedRoutesData?.totalPages || 1,
                totalDocs: fetchedRoutesData?.totalDocs || 0,
                hasNextPage: fetchedRoutesData?.hasNextPage || false,
                hasPreviousPage: fetchedRoutesData?.hasPreviousPage || false,
            });
        }
    }, [fetchedRoutesData, error, isLoading]);

    // Update URL when filters change
    useEffect(() => {
        const urlParams = new URLSearchParams();

        // Add filter params to URL if they have values
        if (searchBy.routeIdOrDriverName.trim()) {
            urlParams.set(
                "routeIdOrDriverName",
                searchBy.routeIdOrDriverName.trim()
            );
        }
        if (searchBy.status.trim() && searchBy.status !== "all") {
            urlParams.set("status", searchBy.status.trim());
        }
        if (searchBy.duration.trim() && searchBy.duration !== "any") {
            urlParams.set("duration", searchBy.duration.trim());
        }

        // Update URL without triggering a page reload
        const newUrl = urlParams.toString()
            ? `${window.location.pathname}?${urlParams.toString()}`
            : window.location.pathname;

        window.history.replaceState({}, "", newUrl);
    }, [searchBy]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPaginationInfo((prev) => ({
            ...prev,
            pageNumber: 1,
        }));
    }, [searchBy]);

    // Handle Add Route Errors and Pending Status
    useEffect(() => {
        if (addRouteError) {
            notify("error", "Something went wrong while adding route");
        }
        if (isPending) {
            notify("info", "Adding route...");
        }
    }, [addRouteError, isPending]);

    // Add Route
    const handleAddRoute = async (routeData: AddRouteItemProps) => {
        // Submit data to api
        await addRoute(routeData);
    };

    // Delete Route
    const handleDeleteRoute = (id: string) => {
        setDeletingRouteId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteRoute = async () => {
        await deleteRoute(deletingRouteId);
        setShowDeleteConfirm(false);
        setDeletingRouteId("");
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

    // Clear all filters
    const clearFilters = () => {
        setSearchBy({
            routeIdOrDriverName: "",
            status: "",
            duration: "",
        });
    };

    // Edit Route (table action)
    const editRoute = (id: string) => {
        const route = fetchedRoutesData?.data?.find(
            (r: any) => r.route_id === id
        );
        if (route) {
            openEditRoute(route.route_id);
        } else {
            notify("error", `Route not found for id: ${id}`);
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
    const handleExportCsv = async () => {
        setIsExportingCsv(true);
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            exportCsv(routes, "routes.csv");
            notify("success", "Routes exported successfully");
        } catch {
            notify("error", "Failed to export routes");
        } finally {
            setIsExportingCsv(false);
        }
    };

    // Selection functions
    const toggleAll = () => {
        const next = { ...selected };
        const shouldSelectAll = !allSelected;
        const currentRoutes = fetchedRoutesData?.data || [];
        currentRoutes.forEach((r: any) => (next[r.route_id] = shouldSelectAll));
        setSelected(next);
    };

    const toggleOne = (id: string) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDeleteSelectedRoutes = () => {
        setShowBulkDeleteConfirm(true);
    };

    const confirmBulkDeleteRoutes = async () => {
        const selectedIds = Object.keys(selected).filter((k) => selected[k]);
        if (!selectedIds.length) return;

        try {
            await deleteSelectedRoutes(selectedIds);
            // Clear selection
            setSelected({});
            setShowBulkDeleteConfirm(false);
        } catch {
            notify("error", "Failed to delete selected routes");
        }
    };

    return (
        <AnimatedPage>
            <div className="Routes-Page main-page py-6 pb-[60px] popup-scrollbar">
                <div className="container">
                    <AnimatedComponent
                        delay={0.1}
                        type="slide"
                        direction="down"
                    >
                        <PageHeader title="Route Management" />
                    </AnimatedComponent>

                    {/* ================== Routes Controls ================== */}
                    <AnimatedComponent delay={0.2} type="fade">
                        <RoutesControls
                            onExportCsv={handleExportCsv}
                            onAddRoute={openAddRoute}
                            isExportingCsv={isExportingCsv}
                        />
                    </AnimatedComponent>

                    {/* ================== Routes Filters Section ================== */}
                    <AnimatedComponent delay={0.3} type="slide" direction="up">
                        <FiltersSection
                            showFilters={showFilters}
                            onToggleFilters={() =>
                                setShowFilters((prev) => !prev)
                            }
                            searchBy={searchBy}
                            setSearchBy={setSearchBy}
                            clearFilters={clearFilters}
                        />
                    </AnimatedComponent>

                    <AnimatedComponent delay={0.4} type="scale">
                        <main
                            className={`white-bg p-4 rounded-lg ${
                                showFilters ? "rounded-t-none" : ""
                            } shadow-md transition-all duration-300 ease-in-out`}
                        >
                            {/* Bulk Actions Bar */}
                            <BulkActionsBar
                                selectedCount={selectedCount}
                                onDeleteSelected={handleDeleteSelectedRoutes}
                            />

                            {/* Routes Table */}
                            <RoutesTable
                                routes={
                                    fetchedRoutesData?.data?.map((r: any) => ({
                                        ...r,
                                        assigned_at:
                                            extractDate(r.assigned_at) || null,
                                    })) || []
                                }
                                selected={selected}
                                selectedCount={selectedCount}
                                allSelected={allSelected}
                                onToggleAll={toggleAll}
                                onToggleOne={toggleOne}
                                onViewRoute={viewRoute}
                                onEditRoute={editRoute}
                                onDeleteRoute={handleDeleteRoute}
                                isLoading={isLoading}
                                error={error}
                            />

                            {/* Pagination */}
                            <Pagination
                                paginationInfo={paginationInfo}
                                onPageChange={setPaginationInfo}
                            />
                        </main>
                    </AnimatedComponent>
                </div>

                {/* ================== Edit Route Modal ================== */}
                {editingRouteId && (
                    <EditRouteModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        routeId={editingRouteId}
                    />
                )}

                {/* ================== Add Route Modal ================== */}
                <AddRouteModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseAddModal}
                    onAddRoute={handleAddRoute}
                />

                {/* ================== Delete Confirmation Modal ================== */}
                <DeleteConfirmationModal
                    isOpen={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={confirmDeleteRoute}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete route ${deletingRouteId}? This action cannot be undone.`}
                    confirmButtonText="Delete Route"
                    isLoading={isDeletingRoute}
                />

                {/* ================== Bulk Delete Confirmation Modal ================== */}
                <DeleteConfirmationModal
                    isOpen={showBulkDeleteConfirm}
                    onClose={() => setShowBulkDeleteConfirm(false)}
                    onConfirm={confirmBulkDeleteRoutes}
                    title="Confirm Bulk Delete"
                    message={`Are you sure you want to delete ${selectedCount} selected routes? This action cannot be undone.`}
                    confirmButtonText="Delete Selected"
                    isLoading={isBulkDeleting}
                />
            </div>
        </AnimatedPage>
    );
};

export default RoutesPage;
