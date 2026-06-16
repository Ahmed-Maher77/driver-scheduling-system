import { 
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import useGetRoutesSummary from "../../../utils/hooks/api/useGetRoutesSummary";
import SectionHeader from "../../Headings/SectionHeader/SectionHeader";

const DashboardChart = () => {
    const { data: fetchedRoutesSummaryData, isLoading, error } = useGetRoutesSummary();

    if (isLoading) {
        return (
            <div className="white-bg p-6 rounded-lg shadow-md flex items-center justify-center min-h-[300px]">
                <div className="flex items-center gap-2 text-gray-500">
                    <i className="fa-solid fa-spinner fa-spin text-xl text-[#10b981]" />
                    <span className="font-semibold">Loading charts...</span>
                </div>
            </div>
        );
    }

    if (error || !fetchedRoutesSummaryData?.data) {
        return (
            <div className="white-bg p-6 rounded-lg shadow-md flex items-center justify-center min-h-[300px] text-red-500">
                <i className="fa-solid fa-triangle-exclamation mr-2" />
                Error loading chart data
            </div>
        );
    }

    const routes = fetchedRoutesSummaryData.data;

    // Calculate status distribution
    const statusCounts = routes.reduce((acc: any, route: any) => {
        acc[route.status] = (acc[route.status] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(statusCounts).map(status => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: statusCounts[status]
    }));

    // Define colors for each status
    const COLORS: Record<string, string> = {
        'Assigned': '#3b82f6', // blue
        'Unassigned': '#f59e0b', // amber
        'In progress': '#10b981', // green
        'Completed': '#8b5cf6', // purple
        'Cancelled': '#ef4444'  // red
    };

    return (
        <div className="white-bg p-6 rounded-lg shadow-md mt-6 flex flex-col gap-6">
            <SectionHeader
                title="Routes Overview"
                label="Analytics"
                count={routes.length}
                countColor="blue"
            />
            
            <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">
                {/* Pie Chart: Status Distribution */}
                <div className="w-full xl:w-1/2 h-[300px] flex flex-col items-center">
                    <h3 className="text-gray-600 font-semibold mb-2">Route Status Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#9ca3af'} />
                                ))}
                            </Pie>
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart: Same Data represented differently */}
                <div className="w-full xl:w-1/2 h-[300px] flex flex-col items-center">
                    <h3 className="text-gray-600 font-semibold mb-2">Routes Count per Status</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={pieData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} allowDecimals={false} />
                            <RechartsTooltip 
                                cursor={{fill: 'rgba(0,0,0,0.02)'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#9ca3af'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardChart;
