import { useState, useEffect } from "react";
import useGetActivityFeeds from "../../utils/hooks/api/useGetActivityFeeds";
import type {
    ActivityFeedRow,
    ActivityFeedsContainerProps,
    PaginationInfo,
} from "../../common/Types/Interfaces";
import ActivityFeedsContent from "./ActivityFeedsContent";
import ActivityFeedsLoading from "./ActivityFeedsLoading";
import ActivityFeedsError from "./ActivityFeedsError";
import useActivityFeedsActions from "../../utils/hooks/activity-feeds/useActivityFeedsActions";

const ActivityFeedsContainer = ({
    pageNumber,
    limit,
    onPageChange,
    filters = {
        status: "",
        driverName: "",
        dateFrom: "",
        dateTo: "",
    },
    onFilterChange,
    onClearFilters,
}: ActivityFeedsContainerProps) => {
    // Fetch activity feeds
    const {
        data: activityFeedsData,
        isLoading,
        error,
        refetch,
    } = useGetActivityFeeds({
        pageNumber,
        limit,
        filters,
    });

    const [renderedActivityFeeds, setRenderedActivityFeeds] = useState<
        ActivityFeedRow[]
    >([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        pageNumber: 1,
        totalPages: 1,
        totalDocs: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });
    const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

    // Update data when API response changes
    useEffect(() => {
        if (activityFeedsData) {
            setRenderedActivityFeeds(activityFeedsData.data || []);
            setPaginationInfo({
                pageNumber: activityFeedsData.currentPage || 1,
                totalPages: activityFeedsData.totalPages || 1,
                totalDocs: activityFeedsData.totalDocs || 0,
                hasNextPage: activityFeedsData.hasNextPage || false,
                hasPreviousPage: activityFeedsData.hasPreviousPage || false,
            });
            setHasInitiallyLoaded(true);
        }
    }, [activityFeedsData]);

    // Use custom hooks for state management
    const actions = useActivityFeedsActions({
        activityFeeds: renderedActivityFeeds,
        refetch,
    });

    // Loading state - only show on initial load, not on filter changes
    if (isLoading && !hasInitiallyLoaded) {
        return <ActivityFeedsLoading message="Loading activity feeds..." />;
    }

    // Error state
    if (error) {
        return <ActivityFeedsError message={error} />;
    }

    return (
        <ActivityFeedsContent
            activityFeeds={renderedActivityFeeds}
            isRefreshing={isLoading && hasInitiallyLoaded}
            paginationInfo={paginationInfo}
            onViewRoute={actions.handleViewRoute}
            onViewDriver={actions.handleViewDriver}
            onExport={actions.handleExport}
            onRefresh={actions.handleRefresh}
            onFilterChange={onFilterChange || actions.handleFilterChange}
            onClearFilters={onClearFilters || actions.handleClearFilters}
            onPageChange={onPageChange}
        />
    );
};

export default ActivityFeedsContainer;
