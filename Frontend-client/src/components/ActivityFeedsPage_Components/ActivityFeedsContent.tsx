import { useState } from "react";
import type { ActivityFeedsContentProps } from "../../common/Types/Interfaces";
import ActivityFeedsControls from "./ActivityFeedsControls";
import ActivityFeedsFilters from "./ActivityFeedsFilters";
import ActivityFeedsTable from "./ActivityFeedsTable";
import ActivityFeedsPagination from "./ActivityFeedsPagination";

const ActivityFeedsContent = ({
    activityFeeds,
    isRefreshing,
    paginationInfo,
    onViewRoute,
    onViewDriver,
    onExport,
    onRefresh,
    onFilterChange,
    onClearFilters,
    onPageChange,
}: ActivityFeedsContentProps) => {
    // Filters state
    const [showFilters, setShowFilters] = useState(true);

    return (
        <>
            {/* Controls */}
            <ActivityFeedsControls
                onToggleFilters={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
                selectedCount={0}
                onExport={onExport}
                onRefresh={onRefresh}
                isRefreshing={isRefreshing}
            />

            <main className="white-bg p-4 rounded-lg shadow-md">
                {/* Filters */}
                <ActivityFeedsFilters
                    showFilters={showFilters}
                    onFilterChange={onFilterChange}
                    onClearFilters={onClearFilters}
                />

                {/* Table */}
                <ActivityFeedsTable
                    activityFeeds={activityFeeds}
                    onViewRoute={onViewRoute}
                    onViewDriver={onViewDriver}
                    isLoading={isRefreshing}
                />

                {/* Pagination */}
                {paginationInfo && onPageChange && (
                    <ActivityFeedsPagination
                        paginationInfo={paginationInfo}
                        onPageChange={onPageChange}
                    />
                )}
            </main>
        </>
    );
};

export default ActivityFeedsContent;
