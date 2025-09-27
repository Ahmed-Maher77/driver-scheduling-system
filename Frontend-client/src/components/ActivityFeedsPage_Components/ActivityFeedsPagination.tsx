import Pagination from "../Pagination/Pagination";
import type { ActivityFeedsPaginationProps } from "../../common/Types/Interfaces";

const ActivityFeedsPagination = ({
    paginationInfo,
    onPageChange,
}: ActivityFeedsPaginationProps) => {
    if (paginationInfo.totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-6">
            <Pagination
                paginationInfo={paginationInfo}
                onPageChange={(page) => onPageChange(page.pageNumber)}
            />
        </div>
    );
};

export default ActivityFeedsPagination;
