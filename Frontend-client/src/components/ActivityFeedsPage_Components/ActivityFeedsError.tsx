import type { ActivityFeedsErrorProps } from "../../common/Types/Interfaces";
import ErrorPage from "../ErrorDetailsPage/ErrorPage";


const ActivityFeedsError = ({ message }: ActivityFeedsErrorProps) => {
    return <ErrorPage message={message} />;
};

export default ActivityFeedsError;
