import { useState } from "react";
import ActivityFeedsLayout from "../../components/ActivityFeedsPage_Components/ActivityFeedsLayout";
import ActivityFeedsPageHeader from "../../components/ActivityFeedsPage_Components/ActivityFeedsPageHeader";
import ActivityFeedsContainer from "../../components/ActivityFeedsPage_Components/ActivityFeedsContainer";

const ActivityFeedsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    return (
        <ActivityFeedsLayout>
            <ActivityFeedsPageHeader />
            <ActivityFeedsContainer
                pageNumber={currentPage}
                limit={limit}
                onPageChange={setCurrentPage}
            />
        </ActivityFeedsLayout>
    );
};

export default ActivityFeedsPage;
