import { useState } from "react";
import useGetActivityFeeds from "../../../utils/hooks/api/useGetActivityFeeds";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import ActivityFeedItem from "./ActivityFeedItem";
import SectionHeader from "../../Headings/SectionHeader/SectionHeader";
import Pagination from "../../Pagination/Pagination";
import type { PaginationInfo } from "../../../common/Types/Interfaces";

const ActivityFeedsContainer = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [hasLoaded, setHasLoaded] = useState(false);
    const limit = 5;

    const { data: responseData, isLoading, error } = useGetActivityFeeds({
        pageNumber,
        limit,
    });

    if (responseData && !hasLoaded) {
        setHasLoaded(true);
    }

    const activityFeedsData = responseData?.data || [];
    const paginationInfo: PaginationInfo | null = responseData
        ? {
              pageNumber: responseData.currentPage || 1,
              totalPages: responseData.totalPages || 1,
              totalDocs: responseData.totalDocs || 0,
              hasNextPage: responseData.hasNextPage || false,
              hasPreviousPage: responseData.hasPreviousPage || false,
          }
        : null;

    const feedsCount = paginationInfo?.totalDocs || 0;

    const handlePageChange = (page: PaginationInfo) => {
        setPageNumber(page.pageNumber);
    };

    return (
        <div className="activity-feeds-container white-bg p-4 rounded-lg shadow-md">
            <SectionHeader
                title="Activity Feeds"
                to="/activity-feeds"
                label="See All"
                count={feedsCount}
                countColor="purple"
            />

            {isLoading && !hasLoaded && (
                <LoadingSpinner message="Loading activity feeds..." />
            )}

            {isLoading && hasLoaded && (
                <div className="flex items-center justify-center py-2 text-sm gray-c">
                    <i className="fa-solid fa-spinner fa-spin mr-2" />
                    Loading...
                </div>
            )}

            {error && <ErrorMessage message={error} />}

            {!error && (hasLoaded || activityFeedsData.length > 0) && (
                <>
                    <ul className={`flex flex-col gap-6 mt-6 timeline-container ${isLoading && hasLoaded ? "opacity-50 pointer-events-none" : ""}`}>
                        {activityFeedsData.map((feed: any) => (
                            <ActivityFeedItem
                                key={feed._id}
                                routeId={feed.route_id}
                                status={feed.status}
                                driver={feed.driver?.id ? feed.driver : undefined}
                                lastDriver={
                                    feed.last_driver?.id
                                        ? feed.last_driver
                                        : undefined
                                }
                                actionTime={feed.action_time}
                            />
                        ))}
                    </ul>

                    {paginationInfo && (
                        <Pagination
                            paginationInfo={paginationInfo}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ActivityFeedsContainer;
