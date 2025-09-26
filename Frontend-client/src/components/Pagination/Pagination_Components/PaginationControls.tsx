import React from "react";
import PaginationArrow from "./PaginationArrow";
import PaginationNumbers from "./PaginationNumbers";
import type { PaginationControlsProps } from "../../../common/Types/Interfaces";

const PaginationControls: React.FC<PaginationControlsProps> = ({
    pageNumber,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageClick,
    onPrevious,
    onNext,
}) => {
    return (
        <div className="flex items-center gap-1">
            {/* Previous Arrow */}
            <PaginationArrow
                direction="previous"
                onClick={onPrevious}
                disabled={!hasPreviousPage}
                title="Previous page"
            />

            {/* Page Numbers */}
            <PaginationNumbers
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageClick={onPageClick}
            />

            {/* Next Arrow */}
            <PaginationArrow
                direction="next"
                onClick={onNext}
                disabled={!hasNextPage}
                title="Next page"
            />
        </div>
    );
};

export default PaginationControls;
