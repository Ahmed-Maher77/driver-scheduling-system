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

                {/* Table with subtle loading indicator */}
                <div className="relative">
                    {isRefreshing && (
                        <div className="absolute top-0 left-0 right-0 z-10 bg-blue-50 border border-blue-200 rounded-t-lg px-4 py-2 text-sm text-blue-600 flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                            Updating results...
                        </div>
                    )}
                    <ActivityFeedsTable
                        activityFeeds={activityFeeds}
                        onViewRoute={onViewRoute}
                        onViewDriver={onViewDriver}
                        isLoading={isRefreshing}
                    />
                </div>

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
