import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import DriverAssignment from "../../components/RouteDetailsPage_Components/DriverAssignment";
import RouteActivity from "../../components/RouteDetailsPage_Components/RouteActivity";
import RouteHeader from "../../components/RouteDetailsPage_Components/RouteHeader";
import RouteInfo from "../../components/RouteDetailsPage_Components/RouteInfo";
import RouteNotes from "../../components/RouteDetailsPage_Components/RouteNotes";
import BackButton from "../../components/BackButton/BackButton";
import EditRouteModal from "../../components/RoutesPage_Components/EditRouteModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { notify } from "../../utils/functions/notify";
import type { RouteRow } from "../../common/Types/Interfaces";

// Mock data - in real app, this would come from API based on routeId
const initialRouteData: RouteRow = {
    id: "RT001",
    startLocation: "Warehouse A",
    endLocation: "City Center",
    status: "assigned",
    assignedDriver: {
        id: "DR001",
        name: "Ethan Harper",
    },
    lastDriver: {
        id: "DR002",
        name: "ahmed",
    },
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    assignedAt: "2025-01-04",
    distance: 18.4,
    distanceUnit: "mile",
    duration: 100,
    timeUnit: "minutes",
    cost: 100,
    currency: "EGP",
    maxSpeed: 120,
    speedUnit: "km/h",
    notes: "Notes",
};

const RouteDetailsPage = () => {
    const navigate = useNavigate();
    const { routeId } = useParams();
    const [routeData, setRouteData] = useState<RouteRow>(initialRouteData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // ================== Fetch Route Details ==================
    useEffect(() => {
        if (routeId) {
            // get route from api
            // setRouteData(routeData);
            // invalidate the routes
        }
    }, [routeId]);

    // Handler functions
    const handleEditRoute = () => {
        setIsEditModalOpen(true);
    };

    const handleDeleteRoute = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        // In real app, this would call API to delete route
        // deleteRouteFromApi(routeId);
        notify("success", "Route deleted successfully");
        navigate("/routes");
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="route-details-page main-page py-6 pb-[60px]">
            <div className="container">
                {/* ======================== Header ======================== */}
                <div className="header-container flex items-center gap-2 justify-between">
                    <PageHeader
                        title="Route Details"
                        subtitle="View and manage route information, driver assignments, and activity history."
                    />
                    <BackButton />
                </div>

                {/* ======================== Main ======================== */}
                <main className="route-details-container mt-8">
                    {/* Route Header */}
                    <RouteHeader
                        id={routeData.id}
                        status={routeData.status}
                        onEdit={handleEditRoute}
                        onDelete={handleDeleteRoute}
                    />

                    {/* Route Info + Route Notes */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <RouteInfo
                            startLocation={routeData.startLocation}
                            endLocation={routeData.endLocation}
                            distance={routeData.distance || 0}
                            distanceUnit={routeData.distanceUnit || "km"}
                            duration={routeData.duration || 0}
                            timeUnit={routeData.timeUnit || "minutes"}
                            cost={routeData.cost || 0}
                            currency={routeData.currency || "EGP"}
                            maxSpeed={routeData.maxSpeed || 0}
                            speedUnit={routeData.speedUnit || "km/h"}
                        />
                        <RouteNotes notes={routeData.notes} />
                    </div>

                    {/* Driver Assignment + Route Activity */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <DriverAssignment
                            assignedDriver={
                                routeData.assignedDriver
                                    ? {
                                          id: routeData.assignedDriver.id || "",
                                          name:
                                              routeData.assignedDriver.name ||
                                              "",
                                          picture:
                                              "https://via.placeholder.com/150",
                                      }
                                    : null
                            }
                            lastDriver={
                                routeData.lastDriver
                                    ? {
                                          id: routeData.lastDriver.id || "",
                                          name: routeData.lastDriver.name || "",
                                          picture:
                                              "https://via.placeholder.com/150",
                                      }
                                    : null
                            }
                        />
                        <RouteActivity
                            items={[
                                {
                                    id: "1",
                                    time: "2025-01-01 09:00",
                                    description: "Route created",
                                },
                                {
                                    id: "2",
                                    time: "2025-01-04 10:15",
                                    description: "Driver assigned",
                                },
                                {
                                    id: "3",
                                    time: "2025-01-05 11:30",
                                    description: "Route updated",
                                },
                            ]}
                        />
                    </div>
                </main>
            </div>

            {/* Edit Route Modal */}
            <EditRouteModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                routeId={routeData.id}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message={`Are you sure you want to delete route ${routeData.id}? This action cannot be undone.`}
                confirmButtonText="Delete Route"
            />
        </div>
    );
};

export default RouteDetailsPage;
