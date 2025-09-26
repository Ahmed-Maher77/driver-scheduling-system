import useGetSummaryOfActivityFeeds from "../../../utils/hooks/api/useGetSummaryOfActivityFeeds";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import ActivityFeedItem from "./ActivityFeedItem";
import SectionHeader from "../../Headings/SectionHeader/SectionHeader";

const ActivityFeedsContainer = () => {
    const {
        data: activityFeedsData,
        isLoading,
        error,
    } = useGetSummaryOfActivityFeeds();

    const feedsCount = activityFeedsData?.length || 0;

    return (
        <div className="activity-feeds-container white-bg p-4 rounded-lg shadow-md">
            <SectionHeader
                title="Activity Feeds"
                to="/activity-feeds"
                label="See All"
                count={feedsCount}
                countColor="purple"
            />

            {/* ================= Loading Status ================= */}
            {isLoading && (
                <LoadingSpinner message="Loading activity feeds..." />
            )}

            {/* ================= Error Status ================= */}
            {error && <ErrorMessage message={error} />}

            {/* ================= Activity Feeds ================= */}
            <ul className="flex flex-col gap-6 mt-6 timeline-container">
                {activityFeedsData?.map((feed: any) => (
                    <ActivityFeedItem
                        key={feed._id}
                        routeId={feed.route_id}
                        status={feed.status}
                        driver={feed.driver}
                        lastDriver={feed.last_driver}
                        actionTime={feed.action_time}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeedsContainer;
