import React from "react";
import type { PaginationProps } from "../../common/Types/Interfaces";
import PaginationInfo from "./Pagination_Components/PaginationInfo";
import PaginationControls from "./Pagination_Components/PaginationControls";

const Pagination: React.FC<PaginationProps> = ({ paginationInfo, onPageChange }) => {
    const { pageNumber, totalPages, hasNextPage, hasPreviousPage } =
        paginationInfo;

    // Don't render if there are no pages or invalid data
    if (totalPages <= 0 || !totalPages) return null;

    // If only one page, show minimal pagination
    if (totalPages === 1) {
        return (
            <div className="flex items-center justify-center py-4 mt-6 border-t border-gray-200">
                <PaginationInfo
                    pageNumber={pageNumber}
                    totalPages={totalPages}
                />
            </div>
        );
    }

    const handlePrevious = () => {
        if (hasPreviousPage) {
            onPageChange({ ...paginationInfo, pageNumber: pageNumber - 1 });
        }
    };

    const handleNext = () => {
        if (hasNextPage) {
            onPageChange({ ...paginationInfo, pageNumber: pageNumber + 1 });
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== pageNumber) {
            onPageChange({ ...paginationInfo, pageNumber: page });
        }
    };

    return (
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-200">
            {/* Page Info */}
            <PaginationInfo pageNumber={pageNumber} totalPages={totalPages} />

            {/* Pagination Controls */}
            <PaginationControls
                pageNumber={pageNumber}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onPageClick={handlePageClick}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
        </div>
    );
};

export default Pagination;
