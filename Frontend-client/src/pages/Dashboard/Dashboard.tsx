import ActivityFeedsContainer from "../../components/Dashboard_Components/ActivityFeedsContainer/ActivityFeedsContainer";
import RoutesContainer from "../../components/Dashboard_Components/RoutesContainer/RoutesContainer";
import StatsContainer from "../../components/Dashboard_Components/StatsContainer/StatsContainer";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import { useAppSelector } from "../../utils/redux-toolkit/reduxHooks";

const Dashboard = () => {
	const isXLargeScreen = useAppSelector((state) => state.windowStates.isXLargeScreen);

    return (
        <div className="Dashboard-Page main-page py-6 pb-[60px]">
            <div className="container">
                {/* =============== Header =============== */}
                <PageHeader title="Dashboard" />

                {/* =============== Stats Container =============== */}
                <StatsContainer />

				{/* =============== Routes & Activity Feeds =============== */}
				<div className={`routes-container mt-6 flex ${isXLargeScreen ? "flex-row" : "flex-col"} gap-6`}>
					<RoutesContainer />
					<ActivityFeedsContainer />
				</div>
            </div>
        </div>
    );
};

export default Dashboard;
