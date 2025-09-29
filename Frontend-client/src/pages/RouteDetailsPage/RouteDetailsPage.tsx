import { useState } from "react";
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
import LoadingPageSpinner from "../../components/LoadingPageSpinner/LoadingPageSpinner";
import ErrorPage from "../../components/ErrorDetailsPage/ErrorPage";
import { notify } from "../../utils/functions/notify";
import useGetRouteDetails from "../../utils/hooks/api/useGetRouteDetails";
import useDeleteRoute from "../../utils/hooks/api/useDeleteRoute";

const RouteDetailsPage = () => {
    const navigate = useNavigate();
    const { id: routeId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Fetch route details
    const {
        data: routeData,
        isLoading,
        error,
        refetch: refetchRouteDetails,
    } = useGetRouteDetails({
        routeId: routeId || "",
    });

    // Delete route
    const { deleteRoute, isPending: isDeletingRoute } = useDeleteRoute();

    // Handler functions
    const handleEditRoute = () => {
        setIsEditModalOpen(true);
    };

    const handleDeleteRoute = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!routeId) return;
        try {
            await deleteRoute(routeId);
            navigate("/routes");
        } catch {
            notify("error", "Failed to delete route");
        }
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    // Show loading spinner while fetching data
    if (isLoading) {
        return <LoadingPageSpinner message="Loading route details..." />;
    }

    // Show error page if there's an error
    if (error) {
        return <ErrorPage message={error} />;
    }

    // Show error if no route data
    if (!routeData) {
        return <ErrorPage message="Route not found" />;
    }

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
                        id={routeData.route_id}
                        status={routeData.status}
                        onEdit={handleEditRoute}
                        onDelete={handleDeleteRoute}
                    />

                    {/* Route Info + Route Notes */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <RouteInfo
                            startLocation={routeData.start_location}
                            endLocation={routeData.end_location}
                            distance={routeData.distance || 0}
                            distanceUnit={routeData.distance_unit || "km"}
                            duration={routeData.duration || 0}
                            timeUnit={routeData.time_unit || "minutes"}
                            cost={routeData.cost || 0}
                            currency={routeData.currency || "EGP"}
                            maxSpeed={routeData.max_speed || 0}
                            speedUnit={routeData.speed_unit || "km/h"}
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
                                              routeData.assignedDriver?.picture,
                                      }
                                    : null
                            }
                            lastDriver={routeData.lastDriver || null}
                        />
                        <RouteActivity
                            items={[
                                {
                                    id: "1",
                                    time: routeData?.created_at || "",
                                    description: "Route created",
                                },
                                {
                                    id: "2",
                                    time: routeData?.assigned_at || "",
                                    description: "Driver assigned",
                                },
                                {
                                    id: "3",
                                    time: routeData?.updated_at || "",
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
                routeId={routeData.route_id}
                onRouteUpdated={refetchRouteDetails}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message={`Are you sure you want to delete route ${routeData.route_id}? This action cannot be undone.`}
                confirmButtonText="Delete Route"
                isLoading={isDeletingRoute}
            />
        </div>
    );
};

export default RouteDetailsPage;
