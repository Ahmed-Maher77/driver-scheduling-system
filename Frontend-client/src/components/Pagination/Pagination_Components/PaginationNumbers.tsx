import React from "react";
import PaginationButton from "./PaginationButton";
import PaginationEllipsis from "./PaginationEllipsis";
import type { PaginationNumbersProps } from "../../../common/Types/Interfaces";

const PaginationNumbers: React.FC<PaginationNumbersProps> = ({
    pageNumber,
    totalPages,
    onPageClick,
}) => {
    // Generate page numbers to display - show only first, current, and last page
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        // Always add first page
        pages.push(1);

        // Add current page if it's not first or last
        if (pageNumber !== 1 && pageNumber !== totalPages) {
            // Add ellipsis if there's a gap
            if (pageNumber > 2) {
                pages.push("...");
            }
            pages.push(pageNumber);
            // Add ellipsis if there's a gap to last page
            if (pageNumber < totalPages - 1) {
                pages.push("...");
            }
        } else if (pageNumber === 1 && totalPages > 2) {
            // If on first page and more than 2 pages, show ellipsis
            pages.push("...");
        } else if (pageNumber === totalPages && totalPages > 2) {
            // If on last page and more than 2 pages, show ellipsis
            pages.push("...");
        }

        // Always add last page (if more than 1 page)
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => (
                <React.Fragment key={index}>
                    {page === "..." ? (
                        <PaginationEllipsis />
                    ) : (
                        <PaginationButton
                            onClick={() => onPageClick(page as number)}
                            isActive={page === pageNumber}
                        >
                            {page}
                        </PaginationButton>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PaginationNumbers;
