// ================================= Global States =================================
// Window States
export type WindowStates = { isXLargeScreen: boolean };

// Sidebar State
export type SidebarState = { activeBar: boolean; compressSidebar: boolean };

// ================================= Components Props =================================
// SidebarLink Props
export interface SidebarLinkProps {
    to: string;
    title: string;
    iconClass: string;
    compressSidebar: boolean;
    onClick: () => void;
    label: string;
}

// Logo Props
export interface LogoProps {
    disabled?: boolean;
    compressSidebar?: boolean;
}

// Tooltip Props
export interface PropTypes {
    content: string;
    direction: "top" | "bottom" | "left" | "right";
    minWidth?: string;
    maxWidth?: string;
    customClass?: string;
}

// StatsCard Props
export interface StatsCardProps {
    title: string;
    value: number;
    unit?: string;
    iconClass?: string;
}

// Responsive Table Props
export type TableAlign = "left" | "center" | "right";
type TableHeaderKey = string;

export interface TableColumn<T extends Record<string, unknown>> {
    key: keyof T | string;
    label?: string;
    align?: TableAlign;
    render?: (row: T) => React.ReactNode;
}

export interface ResponsiveTableProps<T extends Record<string, unknown>> {
    // Backward-compatible props
    headers?: TableHeaderKey[];
    rows: T[];
    // New richer API
    columns?: TableColumn<T>[];
    stickyHeader?: boolean;
    className?: string;
    tableClassName?: string;
    cellAlign?: TableAlign;
    seeDetails?: boolean;
    isLoading?: boolean;
    error?: string | null | any;
}

// Route Item
export type RouteItem = {
    id: string;
    startLocation: string;
    endLocation: string;
    status: string;
    assignedDriver: {
        id: string | null;
        name: string | null;
    };
};

export type RouteRow = {
    id: string;
    start_location: string;
    end_location: string;
    status: "assigned" | "unassigned" | "in progress";
    assignedDriver?: { id?: string; name?: string };
    lastDriver?: { id?: string; name?: string };
    createdAt: string;
    updatedAt?: string | null;
    assignedAt?: string;
    distance: number;
    distanceUnit?: string;
    duration?: number;
    timeUnit?: string;
    cost?: number;
    currency?: string;
    maxSpeed?: number;
    speedUnit?: string;
    notes?: string;
};

// Add Route Item Props
export interface AddRouteItemProps {
    startLocation?: string;
    endLocation?: string;
    status?: string;
    assignedDriver?: DriverInfo;
    distance?: number;
    distanceUnit?: string;
    duration?: number;
    timeUnit?: string;
    cost?: number;
    currency?: string;
    maxSpeed?: number;
    speedUnit?: string;
    notes?: string;
}

// Location Section Props
export interface LocationSectionProps {
    startLocation: string;
    endLocation: string;
    onStartLocationChange: (value: string) => void;
    onEndLocationChange: (value: string) => void;
    startLocationError?: string;
    endLocationError?: string;
}

// Distance Duration Section Props
export interface DistanceDurationSectionProps {
    distance: number;
    distanceUnit: string;
    duration: number;
    timeUnit: string;
    onDistanceChange: (value: number) => void;
    onDistanceUnitChange: (value: string) => void;
    onDurationChange: (value: number) => void;
    onTimeUnitChange: (value: string) => void;
    distanceError?: string;
    durationError?: string;
}

// Cost Speed Section Props
export interface CostSpeedSectionProps {
    cost: number;
    currency: string;
    maxSpeed: number;
    speedUnit: string;
    onCostChange: (value: number) => void;
    onCurrencyChange: (value: string) => void;
    onMaxSpeedChange: (value: number) => void;
    onSpeedUnitChange: (value: string) => void;
    costError?: string;
    maxSpeedError?: string;
}

// Modal Actions Props
export interface ModalActionsProps {
    onCancel: () => void;
    onSubmit?: (e?: React.FormEvent) => void;
    submitLabel: string;
    cancelLabel?: string;
    isSubmitting?: boolean;
}

// Section Header Props
export interface SectionHeaderProps {
    title: string;
    to?: string;
    label?: string;
    count?: number;
    countColor?: "blue" | "green" | "purple" | "red" | "yellow" | "gray";
}

// Route Modal Basic Info Section Props
export interface RouteBasicInfoSectionProps {
    routeId?: string;
    status?: string;
    onStatusChange?: (value: string) => void;
    statusError?: string;
}

// Driver Modal Basic Info Section Props
export interface BasicInfoSectionProps {
    driver: DriverRow;
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Route Modal Notes Section Props
export interface RouteNotesSectionProps {
    notes?: string;
    onNotesChange?: (value: string) => void;
    notesError?: string;
}

// Activity Feed Item Props
export interface ActivityFeedItemProps {
    routeId: string;
    status: string;
    driver?: {
        id?: string;
        name?: string;
    };
    lastDriver?: {
        id?: string;
        name?: string;
    };
    actionTime: Date | string;
}

// Custom Select Props
export type SelectOption<T extends string> = {
    label: string;
    value: T;
};
export interface CustomSelectProps<T extends string> {
    label?: string;
    value: T;
    options: SelectOption<T>[];
    onChange: (value: T) => void;
    className?: string;
    placeholder?: string;
    fullWidth?: boolean;
}

// Edit Route Modal Props
export interface EditRouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    routeId: string;
    onSave?: (route: RouteRow) => void;
}

// Add Route Modal Props
export interface AddRouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddRoute: (
        routeData: Omit<
            RouteRow,
            | "id"
            | "status"
            | "assignedDriver"
            | "lastDriver"
            | "createdAt"
            | "updatedAt"
            | "assignedAt"
        >
    ) => void;
}

// Filters Section Props
export interface SearchBy {
    routeIdOrDriverName: string;
    status: string;
    duration: string;
}
export interface FiltersSectionProps {
    showFilters: boolean;
    onToggleFilters: () => void;
    searchBy: SearchBy;
    setSearchBy: React.Dispatch<React.SetStateAction<SearchBy>>;
}

// Routes Table Props
export interface RoutesTableProps {
    routes: RouteRow[];
    selected: Record<string, boolean>;
    selectedCount: number;
    allSelected: boolean;
    onToggleAll: () => void;
    onToggleOne: (id: string) => void;
    onViewRoute: (id: string) => void;
    onEditRoute: (id: string) => void;
    onDeleteRoute: (id: string) => void;
    isLoading?: boolean;
    error?: string | null | any;
}

// ============================== Drivers Types ==============================
export type DriverStatus = "available" | "unavailable" | "on_route";

export type DriverRow = {
    driver_id: string;
    name: string;
    picture?: File | null | string;
    assignedRoute?: {
        id?: string;
        startLocation?: string;
        endLocation?: string;
        assignedAt?: string;
        distance?: number | string;
        distanceUnit?: string;
        duration?: number | string;
        timeUnit?: string;
    } | null;
    vehicle_type?: string;
    status: DriverStatus;
    license_type?: string;
    phone?: string;
    isLoading?: boolean;
    error?: string | null | any;
};

export interface DriversTableProps {
    drivers: DriverRow[];
    selected: Record<string, boolean>;
    selectedCount: number;
    allSelected: boolean;
    onToggleAll: () => void;
    onToggleOne: (id: string) => void;
    onViewDriver: (id: string) => void;
    onEditDriver: (id: string) => void;
    onDeleteDriver: (id: string) => void;
    isLoading?: boolean;
    error?: string | null | any;
}

export interface RoutesControlsProps {
    onExportCsv: () => void;
    onAddRoute: () => void;
    isExportingCsv?: boolean;
}

export interface DriversControlsProps {
    onExportCsv: () => void;
    onAddDriver: () => void;
    isExportingCsv?: boolean;
}

export type DriverForm = {
    name: string;
    picture?: File | null | string;
    phone: string;
    address?: string;
    contact_channels: {
        email?: string;
        facebook?: string;
        whatsapp?: string;
        linkedin?: string;
    };
    country?: string;
    city?: string;
    status: Exclude<DriverStatus, "on_route">; // available | unavailable
    assignedRouteId?: string;
    notes?: string;
    national_id: File | null | string;
    gender: "Male" | "Female" | "Other";
    dateOfBirth: string; // ISO
    drivingLicense: {
        type: string;
        number: string;
        expiration: string; // ISO
        image: File | null | string; // required
    };
    vehicle: {
        type: string;
        make: string;
        model: string;
        year: string;
        color: string;
    };
};

// Add Driver Modal Props
export interface AddDriverModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Driver Section Props
export interface DriverInfo {
    id?: string;
    name?: string;
}
export interface DriverSectionProps {
    assignedDriver?: DriverInfo;
    lastDriver?: DriverInfo;
    onAssignedDriverChange: (driver: DriverInfo) => void;
    onLastDriverChange?: (driver: DriverInfo) => void;
    assignedDriverError?: string;
    lastDriverError?: string;
    status?: string;
    onCheckAvailability?: (driverId?: string) => void;
    availabilityStatus?: "unknown" | "available" | "unavailable" | "on_route";
    isCheckingAvailability?: boolean;
}

// Edit Driver Modal Props
export interface EditDriverModalProps {
    isOpen: boolean;
    onClose: () => void;
    driverId: string;
    drivers: DriverRow[];
    onSave?: (driver: DriverForm & { id: string }) => void;
}

// Dates Section Props
export interface DatesSectionProps {
    createdAt: string;
    updatedAt: string | null;
    assignedAt: string;
}

// Cost Speed Section Props
export interface CostSpeedSectionProps {
    cost: number;
    currency: string;
    maxSpeed: number;
    speedUnit: string;
    onCostChange: (value: number) => void;
    onCurrencyChange: (value: string) => void;
    onMaxSpeedChange: (value: number) => void;
    onSpeedUnitChange: (value: string) => void;
}

// Notes Section Props
export interface NotesSectionProps {
    notes: string;
    onNotesChange: (value: string) => void;
    notesError?: string;
}

// Location Section Props
export interface LocationSectionProps {
    startLocation: string;
    endLocation: string;
    onStartLocationChange: (value: string) => void;
    onEndLocationChange: (value: string) => void;
}

// Distance Duration Section Props
export interface DistanceDurationSectionProps {
    distance: number;
    distanceUnit: string;
    duration: number;
    timeUnit: string;
    onDistanceChange: (value: number) => void;
    onDistanceUnitChange: (value: string) => void;
    onDurationChange: (value: number) => void;
    onTimeUnitChange: (value: string) => void;
}

// Driver Info
export interface DriverInfo {
    id?: string;
    name?: string;
}
export interface DriverSectionProps {
    assignedDriver?: DriverInfo;
    onAssignedDriverChange: (driver: DriverInfo) => void;
    assignedDriverError?: string;
    status?: string;
}

// Validation Errors
export interface ValidationErrors {
    startLocation?: string;
    endLocation?: string;
    status?: string;
    assignedDriver?: string;
    distance?: string;
    duration?: string;
    cost?: string;
    maxSpeed?: string;
    notes?: string;
}

// Assigned Driver Cell Props
export interface AssignedDriverCellProps {
    driver?: { id?: string; name?: string };
    cellKey: string;
}

// Contact Info Props
export type ContactInfoProps = {
    location?: string;
    email?: string;
    whatsapp?: string;
    linkedin?: string;
    facebook?: string;
};

// Contact Map Props
export type ContactMapProps = {
    title?: string;
    src?: string;
    className?: string;
};

// Driver
export type Driver = { id: string; name: string; picture?: string };
export type DriverAssignmentProps = {
    assignedDriver?: Driver | null;
    lastDriver?: Driver | null;
};

// Route Activity
export type ActivityItem = {
    id: string;
    time: string;
    description: string;
};
export type RouteActivityProps = {
    items?: ActivityItem[];
};

// Route Header
export type RouteHeaderProps = {
    id: string;
    status: "assigned" | "unassigned" | "in progress";
    onEdit?: () => void;
    onDelete?: () => void;
};

// Driver Card Props
export interface DriverCardProps {
    driver?: Driver | null;
    title?: string | null;
}

// Default Cell Props
export interface DefaultCellProps<T extends Record<string, unknown>> {
    row: T;
    col: TableColumn<T>;
}

// Build Columns Props
export interface BuildColumnsProps<T extends Record<string, unknown>> {
    columns: TableColumn<T>[] | undefined;
    headers: string[] | undefined;
    rows: T[];
}

// Actions Column Props
export interface ActionsColumnProps {
    onViewRoute: (id: string) => void;
    onEditRoute: (id: string) => void;
    onDeleteRoute: (id: string) => void;
}

// Select Column Props
export interface SelectColumnProps {
    selected: Record<string, boolean>;
    selectedCount: number;
    allSelected: boolean;
    onToggleAll: () => void;
    onToggleOne: (id: string) => void;
}

// Bulk Actions Bar Props
export interface BulkActionsBarProps {
    selectedCount: number;
    onDeleteSelected: () => void;
}

// Route Assignment Section Props
export interface RouteAssignmentSectionProps {
    form: DriverForm;
    isUnavailable: boolean;
    isCheckingAvailability: boolean;
    routeAvailabilityStatus:
        | "unknown"
        | "assigned"
        | "unassigned"
        | "in progress";
    update: (path: string, value: string | File | null) => void;
    onCheckAvailability: () => void;
    onRouteIdChange: () => void;
}

// Notes Section Props
export interface NotesSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Vehicle Section Props
export interface VehicleSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// License Document Section Props
export interface LicenseDocumentSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// License Section Props
export interface LicenseSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// National Id Document Section Props
export interface NationalIdDocumentSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Identity Section Props
export interface IdentitySectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Contact Channels Section Props
export interface ContactChannelsSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Address Section Props
export interface AddressSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Picture Upload Section Props
export interface PictureUploadSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Delete Confirmation Modal Props
export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

// Route Assignment Section Props
export interface RouteAssignmentSectionProps {
    form: DriverForm;
    isUnavailable: boolean;
    isCheckingAvailability: boolean;
    routeAvailabilityStatus:
        | "unknown"
        | "assigned"
        | "unassigned"
        | "in progress";
    update: (path: string, value: string | File | null) => void;
    onCheckAvailability: () => void;
    onRouteIdChange: () => void;
}

// Driver Search By
export type DriverSearchBy = {
    driverIdOrName: string;
    status: DriverStatus | "";
    vehicleType: string;
    licenseType: string;
};
// Driver Filters Section Props
export interface DriverFiltersSectionProps {
    showFilters: boolean;
    onToggleFilters: () => void;
    searchBy: DriverSearchBy;
    setSearchBy: React.Dispatch<React.SetStateAction<DriverSearchBy>>;
}

// Contacts Section Props
export interface ContactsSectionProps {
    form: DriverForm;
    update: (path: string, value: string | File | null) => void;
}

// Assignment Card Props
export interface AssignmentCardProps {
    assignedRoute?: {
        id?: string;
        startLocation?: string;
        endLocation?: string;
        assignedAt?: string;
        distance?: number | string;
        distanceUnit?: string;
        duration?: number | string;
        timeUnit?: string;
    } | null;
}

// Past Routes Timeline Props
export interface PastRoutesTimelineProps {
    items: PastRouteItem[];
}
// Past Route Item
export interface PastRouteItem {
    id: string;
    startLocation: string;
    endLocation: string;
}

// Vehicle Card Props
export interface VehicleCardProps {
    type?: string | null;
    make?: string | null;
    model?: string | null;
    year?: string | null | number;
    color?: string | null;
}

// Notes Card Props
export interface NotesCardProps {
    notes?: string | null;
}

// Personal Location Card Props
export interface PersonalLocationCardProps {
    gender?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
}

// Contact Info Card Props
export interface ContactInfoCardProps {
    phone?: string | null;
    email?: string | null;
    whatsapp?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
}

// Header Summary Props
export interface HeaderSummaryProps {
    name: string;
    id: string;
    status: string;
    joinedAt?: string;
    pictureUrl: string;
    onEdit: () => void;
    onDelete: () => void;
}

// Info Row Props
export interface InfoRowProps {
    label: string;
    value?: string | number | null;
    href?: string | null;
}

// Calendar Types
export interface MonthRoute {
    route_id: string;
    assigned_at: string; // ISO date (YYYY-MM-DD)
    start_location?: string;
    end_location?: string;
}

// Day Routes Modal Props
export interface DayRoutesModalProps {
    isOpen: boolean;
    dateLabel: string;
    routes: MonthRoute[];
    onClose: () => void;
    onSeeDetails: (routeId: string) => void;
}

// Day Grid Props
export interface DayGridProps {
    monthMatrix: (Date | null)[];
    monthRoutesByDate: Record<string, MonthRoute[]>;
    isLoading?: boolean;
    errorMessage?: string;
    onOpenDay: (key: string, routes: MonthRoute[]) => void;
}

// Month Controls Props
export interface MonthControlsProps {
    monthLabel: string;
    isLoading: boolean;
    onPrev: () => void;
    onNext: () => void;
}

// ================================= API Types =================================
// Use Get All Drivers Props
export interface UseGetAllDriversProps {
    pageNumber: number;
    limit: number;
}

// Use Get Routes By Month Props
export interface UseGetRoutesByMonthProps {
    month: number | string;
    year: number | string;
}

// ============================== Pagination Types ==============================
export interface PaginationProps {
    paginationInfo: {
        pageNumber: number;
        totalPages: number;
        totalDocs: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    onPageChange: (page: {
        pageNumber: number;
        totalPages: number;
        totalDocs: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }) => void;
}
export interface PaginationInfoProps {
    pageNumber: number;
    totalPages: number;
}
export interface PaginationButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    isActive?: boolean;
    title?: string;
    className?: string;
}
export interface PaginationControlsProps {
    pageNumber: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageClick: (page: number) => void;
    onPrevious: () => void;
    onNext: () => void;
}
export interface PaginationNumbersProps {
    pageNumber: number;
    totalPages: number;
    onPageClick: (page: number) => void;
}
export interface PaginationArrowProps {
    direction: "previous" | "next";
    onClick: () => void;
    disabled: boolean;
    title: string;
}
