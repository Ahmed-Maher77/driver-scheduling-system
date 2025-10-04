import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { MonthRoute } from "../../common/Types/Interfaces";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import MonthControls from "../../components/CalenderPage_Components/MonthControls";
import DayGrid from "../../components/CalenderPage_Components/DayGrid";
import DayRoutesModal from "../../components/CalenderPage_Components/DayRoutesModal";
import getMonthMatrix from "../../utils/functions/getMonthMatrix";
import useGetRoutesByMonth from "../../utils/hooks/api/useGetRoutesByMonth";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const CalendarPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const today = new Date();
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-based
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [modalDate, setModalDate] = useState<string>("");
    const [modalRoutes, setModalRoutes] = useState<MonthRoute[]>([]);
    // Fetch routes by month
    const {
        data: fetchedRoutesByMonth,
        isLoading: isLoadingRoutesByMonth,
        error: errorRoutesByMonth,
    } = useGetRoutesByMonth({
        month: currentMonth + 1, // 1-based month
        year: currentYear,
    });
    // State for current month's routes
    const [monthRoutes, setMonthRoutes] = useState<MonthRoute[]>([]);

    useEffect(() => {
        if (fetchedRoutesByMonth) {
            setMonthRoutes(fetchedRoutesByMonth);
        }
    }, [fetchedRoutesByMonth]);

    // Month Matrix
    const monthMatrix = useMemo(
        () => getMonthMatrix(currentYear, currentMonth),
        [currentYear, currentMonth]
    );

    // Build month-local routes map from monthRoutes
    const monthRoutesByDate = useMemo(() => {
        const map: Record<string, MonthRoute[]> = {};
        const toKey = (dateStr: string) => {
            // Handle undefined, null, or empty string
            if (!dateStr || dateStr === "undefined" || dateStr === "null") {
                return null; // Skip this route
            }
            const d = new Date(dateStr);
            if (Number.isNaN(d.getTime())) {
                console.warn("Invalid date string:", dateStr);
                return null; // Skip this route
            }
            const y = d.getFullYear();
            const m = `${d.getMonth() + 1}`.padStart(2, "0");
            const dd = `${d.getDate()}`.padStart(2, "0");
            return `${y}-${m}-${dd}`;
        };
        // Safety check inside useMemo to ensure monthRoutes is always an array
        const safeMonthRoutes = Array.isArray(monthRoutes) ? monthRoutes : [];
        for (const r of safeMonthRoutes) {
            const key = toKey(r.assigned_at);
            if (key) {
                // Only process valid keys
                map[key] ||= [];
                map[key].push(r);
            }
        }
        return map;
    }, [monthRoutes]);

    // Month Label [Example: March 2025]
    const monthLabel = useMemo(() => {
        return new Date(currentYear, currentMonth, 1).toLocaleDateString(
            undefined,
            { month: "long", year: "numeric" }
        );
    }, [currentYear, currentMonth]);

    // Go to previous month
    const goPrevMonth = () => {
        const m = currentMonth - 1;
        if (m < 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else setCurrentMonth(m);
    };

    // Go to next month
    const goNextMonth = () => {
        const m = currentMonth + 1;
        if (m > 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else setCurrentMonth(m);
    };

    // Go to route page
    const goToRoute = (routeId: string) => {
        navigate(`/routes/${routeId}`);
    };

    const openDayModal = (dateKey: string, routes: MonthRoute[]) => {
        setModalDate(dateKey);
        setModalRoutes(routes);
        setIsDayModalOpen(true);
        setSearchParams({ modal: "monthRoutes", date: dateKey });
    };

    const closeDayModal = () => {
        setIsDayModalOpen(false);
        setModalRoutes([]);
        setModalDate("");
        setSearchParams({});
    };

    // Sync modal with URL search params
    useEffect(() => {
        const modal = searchParams.get("modal");
        const date = searchParams.get("date") || "";
        if (modal === "monthRoutes" && date) {
            setModalDate(date);
            setModalRoutes(monthRoutesByDate[date] || []);
            setIsDayModalOpen(true);
        } else {
            setIsDayModalOpen(false);
        }
    }, [searchParams, monthRoutesByDate]);

    // Fetch routes whenever month changes (mock API)
    useEffect(() => {
        if (fetchedRoutesByMonth) {
            // Try different possible response structures
            let routes = [];

            if (Array.isArray(fetchedRoutesByMonth)) {
                routes = fetchedRoutesByMonth;
            } else if (
                fetchedRoutesByMonth?.routes &&
                Array.isArray(fetchedRoutesByMonth.routes)
            ) {
                routes = fetchedRoutesByMonth.routes;
            } else if (
                fetchedRoutesByMonth?.data &&
                Array.isArray(fetchedRoutesByMonth.data)
            ) {
                routes = fetchedRoutesByMonth.data;
            } else {
                console.warn(
                    "No valid routes array found in response:",
                    fetchedRoutesByMonth
                );
                routes = [];
            }

            setMonthRoutes(routes);
        }
    }, [fetchedRoutesByMonth]);

    return (
        <AnimatedPage>
            <div className="Calendar-Page main-page pt-6 pb-[60px]">
                <div className="container">
                    {/* ================== Header ================== */}
                    <AnimatedComponent
                        delay={0.1}
                        type="slide"
                        direction="down"
                    >
                        <PageHeader
                            title="Calendar"
                            subtitle="View and manage calendar events."
                        />
                    </AnimatedComponent>

                    {/* ================== Controls ================== */}
                    <AnimatedComponent delay={0.2} type="fade">
                        <MonthControls
                            monthLabel={monthLabel}
                            isLoading={isLoadingRoutesByMonth}
                            onPrev={goPrevMonth}
                            onNext={goNextMonth}
                        />
                    </AnimatedComponent>

                    {/* ================== Calendar Grid ================== */}
                    <AnimatedComponent delay={0.3} type="scale">
                        <main className="calendar-grid">
                            <DayGrid
                                monthMatrix={monthMatrix}
                                monthRoutesByDate={monthRoutesByDate}
                                isLoading={isLoadingRoutesByMonth}
                                errorMessage={errorRoutesByMonth}
                                onOpenDay={openDayModal}
                            />
                        </main>
                    </AnimatedComponent>
                </div>

                {/* ================== Day Routes Modal ================== */}
                <DayRoutesModal
                    isOpen={isDayModalOpen}
                    dateLabel={modalDate}
                    routes={modalRoutes}
                    onClose={closeDayModal}
                    onSeeDetails={goToRoute}
                />
            </div>
        </AnimatedPage>
    );
};

export default CalendarPage;
