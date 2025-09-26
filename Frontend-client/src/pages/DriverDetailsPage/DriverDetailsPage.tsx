import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import EditDriverModal from "../../components/DriversPage_Components/EditDriverModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import { notify } from "../../utils/functions/notify";
import defaultManImage from "../../assets/images/person.png";
import defaultWomanImage from "../../assets/images/woman.jpg";
import HeaderSummary from "../../components/DriverDetailsPage_Components/HeaderSummary";
import ContactInfoCard from "../../components/DriverDetailsPage_Components/ContactInfoCard";
import PersonalLocationCard from "../../components/DriverDetailsPage_Components/PersonalLocationCard";
import NotesCard from "../../components/DriverDetailsPage_Components/NotesCard";
import VehicleCard from "../../components/DriverDetailsPage_Components/VehicleCard";
import AssignmentCard from "../../components/DriverDetailsPage_Components/AssignmentCard";
import PastRoutesTimeline from "../../components/DriverDetailsPage_Components/PastRoutesTimeline";

const initialDriverData = {
    id: "DR001",
    name: "Ethan Harper",
    picture: "",
    status: "available", // available, unavailable, on_route
    phone: "+1234567890",
    contact_channels: {
        email: "ethan@example.com",
        whatsapp: "+1234567890",
        linkedin: "https://www.linkedin.com/in/ethan-harper",
        facebook: "https://www.facebook.com/ethan-harper",
    },
    address: "123 Main St, Anytown, USA",
    country: "USA",
    city: "Anytown",
    national_id: "https://via.placeholder.com/150",
    age: 30,
    gender: "Male",
    driving_license: {
        type: "B",
        number: "1234567890",
        expiration: "2025-01-01",
        image: "https://via.placeholder.com/150",
    },
    vehicle: {
        type: "Car",
        make: "Toyota",
        model: "Camry",
        year: "2025",
        color: "Red",
    },
    assignedRoute: {
        id: "RT001",
        startLocation: "Warehouse A",
        endLocation: "City Center",
        distance: 18.4,
        distanceUnit: "mile",
        duration: 100,
        timeUnit: "minutes",
        cost: 100,
        currency: "EGP",
        maxSpeed: 120,
        speedUnit: "km/h",
        assignedAt: "2025-01-01",
    },
    pastAssignedRoutes: [
        {
            id: "RT001",
            startLocation: "Warehouse A",
            endLocation: "City Center",
        },
        {
            id: "RT002",
            startLocation: "Warehouse B",
            endLocation: "City Center",
        },
    ],
    notes: "Notes",
    joinedAt: "2024-01-01",
} as const;

const DriverDetailsPage = () => {
    const navigate = useNavigate();
    const { driverId } = useParams();
    const [driverData] = useState<typeof initialDriverData>(initialDriverData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Fetch Driver Data
    useEffect(() => {
        if (driverId) {
            // get driver from api
            // setDriverData(driverData);
        }
    }, [driverId]);

    const handleEdit = () => setIsEditModalOpen(true);
    const handleCloseEdit = () => setIsEditModalOpen(false);

    const handleDelete = () => setShowDeleteConfirm(true);
    const confirmDelete = () => {
        // delete driver via API here
        // deleteDriverFromApi(driverData.id);
        // invalidate the drivers
        notify("success", "Driver deleted successfully");
        navigate("/drivers");
    };

    const statusStr = String(driverData.status);

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
                        name={driverData.name}
                        id={driverData.id}
                        status={statusStr}
                        joinedAt={driverData.joinedAt}
                        pictureUrl={
                            driverData.picture || driverData.gender === "Male"
                                ? defaultManImage
                                : defaultWomanImage
                        }
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Info + Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                        {/* Driver Info */}
                        <section className="md:col-span-2">
                            <ContactInfoCard
                                phone={driverData.phone}
                                email={driverData.contact_channels.email}
                                whatsapp={driverData.contact_channels.whatsapp}
                                linkedin={driverData.contact_channels.linkedin}
                                facebook={driverData.contact_channels.facebook}
                            />
                            <div className="h-5" />
                            <PersonalLocationCard
                                gender={driverData.gender}
                                address={driverData.address}
                                city={driverData.city}
                                country={driverData.country}
                            />
                        </section>

                        {/* Notes */}
                        <NotesCard notes={driverData.notes} />
                    </div>

                    {/* Vehicle + Current Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        {/* Vehicle */}
                        <VehicleCard
                            type={driverData.vehicle.type}
                            make={driverData.vehicle.make}
                            model={driverData.vehicle.model}
                            year={driverData.vehicle.year}
                            color={driverData.vehicle.color}
                        />

                        {/* Assignment */}
                        <AssignmentCard
                            assignedRoute={driverData.assignedRoute as any}
                        />
                    </div>

                    {/* Past Routes (Timeline) */}
                    <PastRoutesTimeline
                        items={driverData.pastAssignedRoutes as any}
                    />
                </main>
            </div>

            {/* Edit Driver Modal */}
            <EditDriverModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEdit}
                driverId={driverData.id}
                drivers={[driverData as any]}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message={`Are you sure you want to delete driver ${driverData.id}? This action cannot be undone.`}
                confirmButtonText="Delete Driver"
            />
        </div>
    );
};

export default DriverDetailsPage;
