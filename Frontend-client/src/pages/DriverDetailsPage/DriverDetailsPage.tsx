import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import EditDriverModal from "../../components/DriversPage_Components/EditDriverModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import defaultManImage from "../../assets/images/person.png";
import defaultWomanImage from "../../assets/images/woman.jpg";
import HeaderSummary from "../../components/DriverDetailsPage_Components/HeaderSummary";
import ContactInfoCard from "../../components/DriverDetailsPage_Components/ContactInfoCard";
import PersonalLocationCard from "../../components/DriverDetailsPage_Components/PersonalLocationCard";
import NotesCard from "../../components/DriverDetailsPage_Components/NotesCard";
import VehicleCard from "../../components/DriverDetailsPage_Components/VehicleCard";
import AssignmentCard from "../../components/DriverDetailsPage_Components/AssignmentCard";
import PastRoutesTimeline from "../../components/DriverDetailsPage_Components/PastRoutesTimeline";
import DriverDocuments from "../../components/DriverDetailsPage_Components/DriverDocuments";
import useGetDriverDetails from "../../utils/hooks/api/useGetDriverDetails";
import ErrorPage from "../../components/ErrorDetailsPage/ErrorPage";
import LoadingPageSpinner from "../../components/LoadingPageSpinner/LoadingPageSpinner";
import useDeleteDriver from "../../utils/hooks/api/useDeleteDriver";

const DriverDetailsPage = () => {
    const navigate = useNavigate();
    const { id: driverId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const {
        data: driverData,
        isLoading,
        error,
    } = useGetDriverDetails({ driverId });
    const { deleteDriver, isPending: isDeleting } = useDeleteDriver();

    const handleEdit = () => setIsEditModalOpen(true);
    const handleCloseEdit = () => setIsEditModalOpen(false);

    const handleDelete = () => setShowDeleteConfirm(true);
    const confirmDelete = async () => {
        // delete driver via API
        await deleteDriver(driverData?.driver_id);
        // close the delete confirmation modal
        setShowDeleteConfirm(false);
        // navigate to the drivers page
        navigate("/drivers");
    };

    // ================== Error Handling ==================
    if (!driverId) {
        return <ErrorPage message="Driver ID is required" />;
    }
    if (error) {
        return (
            <ErrorPage
                message={
                    error || "An error occurred while fetching driver details"
                }
            />
        );
    }

    // ================== Loading ==================
    if (isLoading) {
        return <LoadingPageSpinner message="Loading driver details..." />;
    }

    return (
        <div className="driver-details-page main-page py-6 pb-[60px] text-sm md:text-base lg:text-lg">
            <div className="container">
                {/* ======================== Header ======================== */}
                <div className="header-container flex items-center gap-2 justify-between">
                    <PageHeader
                        title="Driver Details"
                        subtitle="View and manage driver information, vehicle assignments, and activity history."
                    />
                    <BackButton />
                </div>

                {/* Main */}
                <main className="mt-8">
                    {/* Header-like summary with actions */}
                    <HeaderSummary
                        name={driverData?.name}
                        id={driverData?.driver_id}
                        status={driverData?.status}
                        joinedAt={driverData?.joined_at}
                        pictureUrl={
                            driverData?.picture || (driverData?.gender === "Male"
                                ? defaultManImage
                                : defaultWomanImage)
                        }
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Info + Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                        {/* Driver Info */}
                        <section className="md:col-span-2">
                            <ContactInfoCard
                                phone={driverData?.phone}
                                email={driverData?.contact_channels?.email}
                                whatsapp={
                                    driverData?.contact_channels?.whatsapp
                                }
                                linkedin={
                                    driverData?.contact_channels?.linkedin
                                }
                                facebook={
                                    driverData?.contact_channels?.facebook
                                }
                            />
                            <div className="h-5" />
                            <PersonalLocationCard
                                gender={driverData?.gender}
                                address={driverData?.address}
                                city={driverData?.city}
                                country={driverData?.country}
                            />
                        </section>

                        {/* Notes */}
                        <NotesCard notes={driverData?.notes} />
                    </div>

                    {/* Documents */}
                    <DriverDocuments
                        nationalId={driverData?.national_id}
                        license={driverData?.driving_license?.image}
                    />

                    {/* Vehicle + Current Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        {/* Vehicle */}
                        <VehicleCard
                            type={driverData?.vehicle?.type}
                            make={driverData?.vehicle?.make}
                            model={driverData?.vehicle?.model}
                            year={driverData?.vehicle?.year}
                            color={driverData?.vehicle?.color}
                        />

                        {/* Assignment */}
                        <AssignmentCard
                            assignedRoute={driverData?.assignedRoute as any}
                        />
                    </div>

                    {/* Past Routes (Timeline) */}
                    <PastRoutesTimeline
                        items={driverData?.pastAssignedRoutes as any}
                    />
                </main>
            </div>

            {/* Edit Driver Modal */}
            <EditDriverModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEdit}
                driverId={driverData?.driver_id}
                drivers={[driverData as any]}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
                title="Confirm Delete"
                message={`Are you sure you want to delete driver ${driverData?.driver_id}? This action cannot be undone.`}
                confirmButtonText="Delete Driver"
            />
        </div>
    );
};

export default DriverDetailsPage;
