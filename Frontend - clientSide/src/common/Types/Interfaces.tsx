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
    startLocation: string;
    endLocation: string;
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
};

// Add Route Item Props
export interface AddRouteItemProps {
    startLocation?: string;
    endLocation?: string;
    distance?: number;
    distanceUnit?: string;
    duration?: number;
    timeUnit?: string;
    cost?: number;
    currency?: string;
    maxSpeed?: number;
    speedUnit?: string;
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
    onSubmit: (e?: React.FormEvent) => void;
    submitLabel: string;
    cancelLabel?: string;
    isSubmitting?: boolean;
}

// Section Header Props
export interface SectionHeaderProps {
    title: string;
    to?: string;
    label?: string;
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
    actionTime: string;
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
    routeId: string;
    driverName: string;
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
    onLastDriverChange: (driver: DriverInfo) => void;
}

// Dates Section Props
export interface DatesSectionProps {
    createdAt: string;
    updatedAt: string | null;
    assignedAt: string;
    onCreatedAtChange: (value: string) => void;
    onUpdatedAtChange: (value: string | null) => void;
    onAssignedAtChange: (value: string) => void;
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

// Modal Actions Props
export interface ModalActionsProps {
    onCancel: () => void;
    onSubmit: (e?: React.FormEvent) => void;
    submitLabel: string;
    cancelLabel?: string;
    isSubmitting?: boolean;
}

// Basic Info Section Props
export interface BasicInfoSectionProps {
    routeId: string;
    status: string;
    onStatusChange: (value: string) => void;
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
