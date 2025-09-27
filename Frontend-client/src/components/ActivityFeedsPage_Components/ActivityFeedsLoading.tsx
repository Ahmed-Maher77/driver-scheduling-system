import type { ActivityFeedsLoadingProps } from "../../common/Types/Interfaces";
import LoadingPageSpinner from "../LoadingPageSpinner/LoadingPageSpinner";

const ActivityFeedsLoading = ({
    message = "Loading activity feeds...",
}: ActivityFeedsLoadingProps) => {
    return <LoadingPageSpinner message={message} />;
};

export default ActivityFeedsLoading;
