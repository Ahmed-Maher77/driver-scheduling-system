import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { MonthRoute } from "../../common/Types/Interfaces";
import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import MonthControls from "../../components/CalenderPage_Components/MonthControls";
import DayGrid from "../../components/CalenderPage_Components/DayGrid";
import DayRoutesModal from "../../components/CalenderPage_Components/DayRoutesModal";
import { notify } from "../../utils/functions/notify";
import getMonthMatrix from "../../utils/functions/getMonthMatrix";

const CalendarPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const today = new Date();
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-based
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [modalDate, setModalDate] = useState<string>("");
    const [modalRoutes, setModalRoutes] = useState<MonthRoute[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    // State for current month's routes
    const [monthRoutes, setMonthRoutes] = useState<MonthRoute[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Month Matrix
    const monthMatrix = useMemo(
        () => getMonthMatrix(currentYear, currentMonth),
        [currentYear, currentMonth]
    );

    // Build month-local routes map from monthRoutes
    const monthRoutesByDate = useMemo(() => {
        const map: Record<string, MonthRoute[]> = {};
        const toKey = (dateStr: string) => {
            const d = new Date(dateStr);
            if (Number.isNaN(d.getTime())) return dateStr;
            const y = d.getFullYear();
            const m = `${d.getMonth() + 1}`.padStart(2, "0");
            const dd = `${d.getDate()}`.padStart(2, "0");
            return `${y}-${m}-${dd}`;
        };
        for (const r of monthRoutes) {
            const key = toKey(r.assignedAt);
            map[key] ||= [];
            map[key].push(r);
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
        let isActive = true;
        const fetchMonthRoutes = async (apiMonth: number) => {
            setIsLoading(true);
            try {
                // TODO: replace with real API call using currentYear and apiMonth
                // const res = await fetch(`/api/calendar?year=${currentYear}&month=${apiMonth}`);
                // const data: MonthRoute[] = await res.json();
                // setMonthRoutes(data);
                setMonthRoutes([
                    {
                        id: "RT016",
                        assignedAt: "2025-09-21",
                        startLocation: "Warehouse G",
                        endLocation: "City Center",
                    },
                    {
                        id: "RT017",
                        assignedAt: "2025-09-22",
                        startLocation: "Warehouse H",
                        endLocation: "City Center",
                    },
                    {
                        id: "RT023",
                        assignedAt: "2025-09-22",
                        startLocation: "Warehouse J",
                        endLocation: "City Center",
                    },
                ]);
            } catch {
                const message =
                    "Something went wrong while fetching month routes";
                setErrorMessage(message);
                notify("error", message);
            } finally {
                if (isActive) setIsLoading(false);
            }
        };
        // Convert to 1-based month for API usage
        const apiMonth = currentMonth + 1;
        fetchMonthRoutes(apiMonth);
        return () => {
            isActive = false;
        };
    }, [currentYear, currentMonth]);

    return (
        <div className="Calendar-Page main-page pt-6 pb-[60px]">
            <div className="container">
                {/* ================== Header ================== */}
                <PageHeader
                    title="Calendar"
                    subtitle="View and manage calendar events."
                />

                {/* ================== Controls ================== */}
                <MonthControls
                    monthLabel={monthLabel}
                    isLoading={isLoading}
                    onPrev={goPrevMonth}
                    onNext={goNextMonth}
                />

                {/* ================== Calendar Grid ================== */}
                <main className="calendar-grid">
                    <DayGrid
                        monthMatrix={monthMatrix}
                        monthRoutesByDate={monthRoutesByDate}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        onOpenDay={openDayModal}
                    />
                </main>
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
    );
};

export default CalendarPage;
