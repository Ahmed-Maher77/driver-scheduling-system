import SectionHeader from "../../Headings/SectionHeader/SectionHeader";
import ActivityFeedItem from "./ActivityFeedItem";

const activityFeeds = [
    {
        routeId: "RT001",
        status: "assigned",
        driver: {
            id: "DR001",
            name: "Ethan Harper",
        },
        actionTime: "2025-01-01 12:00:00",
    },
	{
		routeId: "RT002",
		status: "unassigned",
		driver: {
			id: null,
			name: null,
		},
		lastDriver: {
			id: "DR002",
			name: "Noah White",
		},
		actionTime: "2025-01-01 12:00:00",
	},
	{
		routeId: "RT003",
		status: "assigned",
		driver: {
			id: "DR003",
			name: "Noah White",
		},
		actionTime: "2025-01-01 12:00:00",
	}
];

const ActivityFeedsContainer = () => {
    return (
        <div className="activity-feeds-container white-bg p-4 rounded-lg shadow-md">
            <SectionHeader
                title="Activity Feeds"
                to="/activity-feeds"
                label="See All"
            />

            <ul className="flex flex-col gap-6 mt-4 timeline-container">
			    {activityFeeds.map((feed) => (
					<ActivityFeedItem key={feed.routeId} routeId={feed.routeId} status={feed.status} driver={feed.driver} lastDriver={feed.lastDriver} actionTime={feed.actionTime} />
				))}
            </ul>
        </div>
    );
};

export default ActivityFeedsContainer;
