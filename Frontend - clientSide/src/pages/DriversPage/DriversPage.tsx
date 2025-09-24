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
import type { DriverRow } from "../../common/Types/Interfaces";
import { exportDriversCsv } from "../../components/DriversPage_Components/exportCsv";
import { notify } from "../../utils/functions/notify";

const initialDriversData: DriverRow[] = [
    {
        id: "DR001",
        name: "Ethan Harper",
        picture: "https://via.placeholder.com/150",
        status: "available", // available, unavailable, on_route
        phone: "+1234567890",
        licenseType: "B",
        vehicleType: "Car",
        assignedRouteId: "RT001",
    },
    {
        id: "DR002",
        name: "Liam Carter",
        picture: "https://via.placeholder.com/150",
        status: "unavailable", // available, unavailable, on_route
        phone: "+1234567890",
        licenseType: "B",
        vehicleType: "Car",
        assignedRouteId: "RT002",
    },
    {
        id: "DR003",
        name: "Noah White",
        picture: "https://via.placeholder.com/150",
        status: "on_route", // available, unavailable, on_route
        phone: "+1234567890",
        licenseType: "B",
        vehicleType: "Car",
        assignedRouteId: "RT003",
    },
    {
        id: "DR004",
        name: "James Brown",
        picture: "https://via.placeholder.com/150",
        status: "unavailable", // available, unavailable, on_route
        phone: "+1234567890",
        licenseType: "B",
        vehicleType: "Car",
        assignedRouteId: "RT004",
    },
];

const DriversPage = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [searchBy, setSearchBy] = useState<DriverSearchBy>({
        driverId: "",
        name: "",
        status: "",
        vehicleType: "",
        licenseType: "",
    });
    const [drivers, setDrivers] = useState<DriverRow[]>(initialDriversData);
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
    const selectedCount = Object.values(selected).filter(Boolean).length;
    const allSelected =
        drivers.length > 0 && drivers.every((d) => selected[d.id]);

    useEffect(() => {
        // get drivers from api
        // setDrivers(newDrivers);
    }, []);

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
        drivers.forEach((d) => (next[d.id] = shouldSelectAll));
        setSelected(next);
    };

    const toggleOne = (id: string) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const deleteSelectedDrivers = () => {
        setShowBulkDeleteConfirm(true);
    };

    const confirmBulkDelete = () => {
        const selectedIds = Object.keys(selected).filter((k) => selected[k]);
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
            exportDriversCsv(drivers);
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
                <main className={`white-bg p-4 rounded-lg ${showFilters ? "rounded-t-none" : ""} shadow-md transition-all duration-300 ease-in-out`}>
                    {/* Bulk Actions Bar */}
                    <BulkActionsBar
                        selectedCount={selectedCount}
                        onDeleteSelected={deleteSelectedDrivers}
                    />

                    {/* Drivers Table */}
                    <DriversTable
                        drivers={drivers}
                        selected={selected}
                        selectedCount={selectedCount}
                        allSelected={allSelected}
                        onToggleAll={toggleAll}
                        onToggleOne={toggleOne}
                        onViewDriver={(id) => navigate(`/drivers/${id}`)}
                        onEditDriver={(id) => openEditDriver(id)}
                        onDeleteDriver={handleDeleteDriver}
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
                drivers={drivers}
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
