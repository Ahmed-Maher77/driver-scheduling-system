import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom"; // Available for future modal functionality
import ActivityFeedsLayout from "../../components/ActivityFeedsPage_Components/ActivityFeedsLayout";
import ActivityFeedsPageHeader from "../../components/ActivityFeedsPage_Components/ActivityFeedsPageHeader";
import ActivityFeedsContainer from "../../components/ActivityFeedsPage_Components/ActivityFeedsContainer";
import type { ActivityFeedFilters } from "../../common/Types/Interfaces";

const ActivityFeedsPage = () => {
    // Pagination Info
    const [paginationInfo, setPaginationInfo] = useState({
        pageNumber: 1,
        totalPages: 1,
        totalDocs: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    // Filters - Initialize from URL params
    const [searchBy, setSearchBy] = useState<ActivityFeedFilters>(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");
        return {
            status:
                status === "assigned" ||
                status === "unassigned" ||
                status === "in progress"
                    ? status
                    : "",
            driverName: urlParams.get("driverName") || "",
            dateFrom: urlParams.get("dateFrom") || "",
            dateTo: urlParams.get("dateTo") || "",
        };
    });

    // Note: searchParams and setSearchParams are available for future modal functionality
    // const [searchParams, setSearchParams] = useSearchParams();

    // Update URL when filters change
    useEffect(() => {
        const urlParams = new URLSearchParams();

        // Add filter params to URL if they have values
        if (searchBy.status.trim()) {
            urlParams.set("status", searchBy.status.trim());
        }
        if (searchBy.driverName.trim()) {
            urlParams.set("driverName", searchBy.driverName.trim());
        }
        if (searchBy.dateFrom.trim()) {
            urlParams.set("dateFrom", searchBy.dateFrom.trim());
        }
        if (searchBy.dateTo.trim()) {
            urlParams.set("dateTo", searchBy.dateTo.trim());
        }

        // Update URL without triggering a page reload
        const newUrl = urlParams.toString()
            ? `${window.location.pathname}?${urlParams.toString()}`
            : window.location.pathname;

        window.history.replaceState({}, "", newUrl);
    }, [searchBy]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPaginationInfo((prev) => ({
            ...prev,
            pageNumber: 1,
        }));
    }, [searchBy]);

    return (
        <ActivityFeedsLayout>
            <ActivityFeedsPageHeader />
            <ActivityFeedsContainer
                pageNumber={paginationInfo.pageNumber}
                limit={10}
                onPageChange={(page) =>
                    setPaginationInfo((prev) => ({ ...prev, pageNumber: page }))
                }
                filters={searchBy}
                onFilterChange={setSearchBy}
                onClearFilters={() =>
                    setSearchBy({
                        status: "",
                        driverName: "",
                        dateFrom: "",
                        dateTo: "",
                    })
                }
            />
        </ActivityFeedsLayout>
    );
};

export default ActivityFeedsPage;
