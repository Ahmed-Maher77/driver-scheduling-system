import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import DriversControls from "../../components/DriversPage_Components/DriversControls";
import DriversTable from "../../components/DriversPage_Components/DriversTable";
import DriversFiltersSection from "../../components/DriversPage_Components/FiltersSection";
import type { DriverSearchBy } from "../../common/Types/Interfaces";
import BulkActionsBar from "../../components/BulkActionsBar/BulkActionsBar";
import AddDriverModal from "../../components/DriversPage_Components/AddDriverModal";
import EditDriverModal from "../../components/DriversPage_Components/EditDriverModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { exportDriversCsv } from "../../components/DriversPage_Components/exportCsv";
import { notify } from "../../utils/functions/notify";
import useGetAllDrivers from "../../utils/hooks/api/useGetAllDrivers.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";

const DriversPage = () => {
    // Pagination Info
    const [paginationInfo, setPaginationInfo] = useState({
        pageNumber: 1,
        totalPages: 1,
        totalDocs: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });
    // Fetch Drivers
    const {
        data: fetchedDriversData,
        isLoading,
        error,
    } = useGetAllDrivers({ pageNumber: paginationInfo.pageNumber, limit: 10 });
    const [drivers] = useState<any>([]);

    // Filters
    const [showFilters, setShowFilters] = useState(true);
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [searchBy, setSearchBy] = useState<DriverSearchBy>({
        driverIdOrName: "",
        status: "",
        vehicleType: "",
        licenseType: "",
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingDriverId, setDeletingDriverId] = useState("");
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingDriverId, setEditingDriverId] = useState("");
    const [isExportingCsv, setIsExportingCsv] = useState(false);

    // Sync modal state with URL search params
    useEffect(() => {
        const modal = searchParams.get("modal");
        const driverId = searchParams.get("driverId") || "";
        if (modal === "addDriver") {
            setIsAddModalOpen(true);
            setIsEditModalOpen(false);
            setEditingDriverId("");
            return;
        }
        if (modal === "editDriver" && driverId) {
            setIsEditModalOpen(true);
            setIsAddModalOpen(false);
            setEditingDriverId(driverId);
            return;
        }
        // No modal param → close both
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditingDriverId("");
    }, [searchParams]);

    // Calculate selection state
    const selectedCount = Object.values(selected).filter(Boolean)?.length;
    const allSelected =
        fetchedDriversData?.data?.length > 0 &&
        fetchedDriversData.data.every((d: any) => selected[d.driver_id]);

    useEffect(() => {
        // get drivers from api
        if (fetchedDriversData) {
            // Set the pagination info
            setPaginationInfo({
                pageNumber: fetchedDriversData?.currentPage || 1,
                totalPages: fetchedDriversData?.totalPages || 1,
                totalDocs: fetchedDriversData?.totalDocs || 0,
                hasNextPage: fetchedDriversData?.hasNextPage || false,
                hasPreviousPage: fetchedDriversData?.hasPreviousPage || false,
            });
        }
    }, [fetchedDriversData, error, isLoading]);

    // Filter Drivers based on: driverId, name, status, vehicleType
    useEffect(() => {
        // get drivers from api
        // setDrivers(newDrivers);
    }, [searchBy]);

    const openAddDriver = () => setSearchParams({ modal: "addDriver" });
    const openEditDriver = (id: string) =>
        setSearchParams({ modal: "editDriver", driverId: id });
    const closeModals = () => setSearchParams({});

    const handleDeleteDriver = (id: string) => {
        setDeletingDriverId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteDriver = () => {
        // setDrivers((prev) => prev.filter((d) => d.id !== deletingDriverId));
        console.log("Deleting driver:", deletingDriverId);
        // call api to delete driver
        // deleteDriverFromApi(deletingDriverId);
        // invalidate the drivers
        notify("success", "Driver deleted");
        setShowDeleteConfirm(false);
        setDeletingDriverId("");
    };

    // Selection functions
    const toggleAll = () => {
        const next = { ...selected };
        const shouldSelectAll = !allSelected;
        drivers.forEach((d: any) => (next[d.id] = shouldSelectAll));
        setSelected(next);
    };

    const toggleOne = (id: string) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const deleteSelectedDrivers = () => {
        setShowBulkDeleteConfirm(true);
    };

    const confirmBulkDelete = () => {
        const selectedIds = Object.keys(selected).filter(
            (k: any) => selected[k]
        );
        if (!selectedIds.length) return;
        // delete selected drivers from api
        // deleteSelectedDriversFromApi(selectedIds);
        // setDrivers((prev) => prev.filter((d) => !selected[d.id]));
        // Clear selection
        setSelected({});
        notify("success", "Selected drivers deleted successfully");
        setShowBulkDeleteConfirm(false);
        // invalidate the drivers
    };

    // Export CSV
    const handleExportCsv = async () => {
        setIsExportingCsv(true);
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            exportDriversCsv(drivers as any);
            notify("success", "Drivers exported successfully");
        } catch {
            notify("error", "Failed to export drivers");
        } finally {
            setIsExportingCsv(false);
        }
    };

    return (
        <div className="Drivers-Page main-page py-6 pb-[60px] popup-scrollbar">
            <div className="container">
                <PageHeader title="Drivers" />

                {/* ================== Drivers Controls ================== */}
                <DriversControls
                    onExportCsv={handleExportCsv}
                    onAddDriver={openAddDriver}
                    isExportingCsv={isExportingCsv}
                />

                {/* ================== Drivers Filters Section ================== */}
                <DriversFiltersSection
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters((v) => !v)}
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                />

                {/* ================== Drivers Table ================== */}
                <main
                    className={`white-bg p-4 rounded-lg ${
                        showFilters ? "rounded-t-none" : ""
                    } shadow-md transition-all duration-300 ease-in-out`}
                >
                    {/* Bulk Actions Bar */}
                    <BulkActionsBar
                        selectedCount={selectedCount}
                        onDeleteSelected={deleteSelectedDrivers}
                    />

                    {/* Drivers Table */}
                    <DriversTable
                        drivers={fetchedDriversData?.data || []}
                        selected={selected}
                        selectedCount={selectedCount}
                        allSelected={allSelected}
                        onToggleAll={toggleAll}
                        onToggleOne={toggleOne}
                        onViewDriver={(id) => navigate(`/drivers/${id}`)}
                        onEditDriver={(id) => openEditDriver(id)}
                        onDeleteDriver={handleDeleteDriver}
                        isLoading={isLoading}
                        error={error}
                    />

                    {/* Pagination */}
                    <Pagination
                        paginationInfo={paginationInfo}
                        onPageChange={setPaginationInfo}
                    />
                </main>
            </div>
            {/* ================== Add Driver Modal ================== */}
            <AddDriverModal isOpen={isAddModalOpen} onClose={closeModals} />

            {/* ================== Edit Driver Modal ================== */}
            <EditDriverModal
                isOpen={isEditModalOpen}
                onClose={closeModals}
                driverId={editingDriverId}
                drivers={drivers as any}
            />

            {/* ================== Delete Confirmation Modal ================== */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDeleteDriver}
                title="Confirm Delete"
                message={`Are you sure you want to delete driver ${deletingDriverId}? This action cannot be undone.`}
                confirmButtonText="Delete Driver"
            />

            {/* ================== Bulk Delete Confirmation Modal ================== */}
            <DeleteConfirmationModal
                isOpen={showBulkDeleteConfirm}
                onClose={() => setShowBulkDeleteConfirm(false)}
                onConfirm={confirmBulkDelete}
                title="Confirm Bulk Delete"
                message={`Are you sure you want to delete ${selectedCount} selected drivers? This action cannot be undone.`}
                confirmButtonText="Delete Selected"
            />
        </div>
    );
};

export default DriversPage;
