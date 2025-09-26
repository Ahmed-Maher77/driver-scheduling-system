import React from "react";
import type { PaginationInfoProps } from "../../../common/Types/Interfaces";

const PaginationInfo: React.FC<PaginationInfoProps> = ({
    pageNumber,
    totalPages,
}) => {
    return (
        <div className="text-sm text-gray-600">
            Showing page {pageNumber} of {totalPages}
        </div>
    );
};

export default PaginationInfo;
