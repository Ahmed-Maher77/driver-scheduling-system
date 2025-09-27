import { useState, useEffect } from "react";
import type { PaginationInfo, UseActivityFeedsPageStateProps, UseActivityFeedsPageStateReturn } from "../../../common/Types/Interfaces";


const useActivityFeedsPageState = ({
    pageNumber,
}: UseActivityFeedsPageStateProps): UseActivityFeedsPageStateReturn => {
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
        pageNumber: 1,
        totalPages: 1,
        totalDocs: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    // Update pagination when pageNumber changes
    useEffect(() => {
        setPaginationInfo((prev) => ({ ...prev, pageNumber }));
    }, [pageNumber]);

    const handlePageChange = (page: number) => {
        setPaginationInfo((prev) => ({ ...prev, pageNumber: page }));
    };

    return {
        paginationInfo,
        setPaginationInfo,
        handlePageChange,
    };
};

export default useActivityFeedsPageState;
