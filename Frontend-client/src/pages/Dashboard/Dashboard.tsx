import ActivityFeedsContainer from "../../components/Dashboard_Components/ActivityFeedsContainer/ActivityFeedsContainer";
import RoutesContainer from "../../components/Dashboard_Components/RoutesContainer/RoutesContainer";
import StatsContainer from "../../components/Dashboard_Components/StatsContainer/StatsContainer";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import { useAppSelector } from "../../utils/redux-toolkit/reduxHooks";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const Dashboard = () => {
    const isXLargeScreen = useAppSelector(
        (state) => state.windowStates.isXLargeScreen
    );

    return (
        <AnimatedPage>
            <div className="Dashboard-Page main-page py-6 pb-[60px]">
                <div className="container">
                    {/* =============== Header =============== */}
                    <AnimatedComponent
                        delay={0.1}
                        type="slide"
                        direction="down"
                    >
                        <PageHeader title="Dashboard" />
                    </AnimatedComponent>

                    {/* =============== Stats Container =============== */}
                    <AnimatedComponent delay={0.2} type="scale">
                        <StatsContainer />
                    </AnimatedComponent>

                    {/* =============== Routes & Activity Feeds =============== */}
                    <AnimatedComponent delay={0.3} type="fade">
                        <div
                            className={`routes-container mt-6 flex ${
                                isXLargeScreen ? "flex-row" : "flex-col"
                            } gap-6`}
                        >
                            <RoutesContainer />
                            <ActivityFeedsContainer />
                        </div>
                    </AnimatedComponent>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Dashboard;
