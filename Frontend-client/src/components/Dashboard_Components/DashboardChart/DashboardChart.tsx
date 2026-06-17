import ReactECharts from "echarts-for-react";
import "./DashboardChart.scss";
import useGetDashboardStats from "../../../utils/hooks/api/useGetDashboardStats";
import SectionHeader from "../../Headings/SectionHeader/SectionHeader";

const COLORS: Record<string, string> = {
    'Assigned': '#3b82f6',     // Blue
    'Unassigned': '#f59e0b',   // Amber
    'In progress': '#10b981',  // Emerald
    'Completed': '#8b5cf6',   // Violet
    'Cancelled': '#ef4444'    // Red
};

const DashboardChart = () => {
    const { data: fetchedStatsData, isLoading, error } = useGetDashboardStats();

    if (isLoading) {
        return (
            <div className="dashboard-chart flex items-center justify-center min-h-[320px]">
                <div className="flex items-center gap-3 text-gray-500">
                    <i className="fa-solid fa-spinner fa-spin text-2xl text-[#10b981]" />
                    <span className="font-semibold text-sm">Loading visual analytics...</span>
                </div>
            </div>
        );
    }

    if (error || !fetchedStatsData) {
        return (
            <div className="dashboard-chart flex items-center justify-center min-h-[320px] text-red-500 border border-red-200 rounded-lg bg-red-50/20">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-triangle-exclamation text-lg" />
                    <span className="font-medium text-sm">Error loading charts data</span>
                </div>
            </div>
        );
    }

    const routeStatusCounts = fetchedStatsData.routeStatusCounts || {
        assigned: 0,
        unassigned: 0,
        "in progress": 0,
        completed: 0,
        cancelled: 0
    };

    const pieData = [
        { name: 'Assigned', value: routeStatusCounts.assigned || 0 },
        { name: 'Unassigned', value: routeStatusCounts.unassigned || 0 },
        { name: 'In progress', value: routeStatusCounts['in progress'] || 0 },
        { name: 'Completed', value: routeStatusCounts.completed || 0 },
        { name: 'Cancelled', value: routeStatusCounts.cancelled || 0 }
    ].filter(item => item.value > 0);

    const totalRoutes = fetchedStatsData.totalRoutes || 0;

    if (totalRoutes === 0 || pieData.length === 0) {
        return (
            <div className="dashboard-chart mt-6">
                <SectionHeader
                    title="Routes Overview"
                    label="Analytics"
                    count={0}
                    countColor="blue"
                />
                <div className="flex flex-col items-center justify-center min-h-[250px] border border-dashed border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50/50 dark:bg-zinc-950/20 p-6 text-center mt-6">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400 mb-3">
                        <i className="fa-solid fa-chart-pie text-xl" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-zinc-300">No Route Data Available</h4>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 max-w-xs mt-1">
                        Add and assign routes to drivers to see scheduling distribution and status metrics.
                    </p>
                </div>
            </div>
        );
    }

    // 1. Donut Chart Configuration
    const pieOption = {
        baseOption: {
            tooltip: {
                trigger: 'item',
                backgroundColor: '#ffffff',
                borderWidth: 0,
                padding: [8, 12],
                textStyle: {
                    color: '#374151',
                    fontSize: 12,
                    fontFamily: 'Inter, sans-serif'
                },
                extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 8px;'
            },
            legend: {
                orient: 'vertical',
                right: '5%',
                top: 'center',
                icon: 'circle',
                itemGap: 12,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#4b5563',
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif'
                }
            },
            series: [
                {
                    name: 'Route Status',
                    type: 'pie',
                    radius: ['58%', '78%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 4,
                        borderColor: '#ffffff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{value|' + totalRoutes + '}\n{label|' + (totalRoutes > 1 ? 'Routes' : 'Route') + '}',
                        rich: {
                            value: {
                                fontSize: 26,
                                fontWeight: '700',
                                color: '#1f2937',
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: 34
                            },
                            label: {
                                fontSize: 11,
                                color: '#9ca3af',
                                fontWeight: 500,
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: 16
                            }
                        }
                    },
                    emphasis: {
                        scale: true,
                        scaleSize: 6,
                        label: {
                            show: true,
                            formatter: '{value|' + totalRoutes + '}\n{label|' + (totalRoutes > 1 ? 'Routes' : 'Route') + '}',
                            rich: {
                                value: {
                                    fontSize: 26,
                                    fontWeight: '700',
                                    color: '#1f2937',
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: 34
                                },
                                label: {
                                    fontSize: 11,
                                    color: '#9ca3af',
                                    fontWeight: 500,
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: 16
                                }
                            }
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.08)'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: pieData.map(item => ({
                        value: item.value,
                        name: item.name,
                        itemStyle: {
                            color: COLORS[item.name]
                        }
                    }))
                }
            ]
        },
        media: [
            {
                query: {
                    maxWidth: 500
                },
                option: {
                    legend: {
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '0',
                        top: 'auto',
                        right: 'auto',
                        itemGap: 10
                    },
                    series: [
                        {
                            center: ['50%', '42%'],
                            radius: ['50%', '70%']
                        }
                    ]
                }
            }
        ]
    };

    // 2. Bar Chart Configuration
    const barOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: '#ffffff',
            borderWidth: 0,
            padding: [8, 12],
            textStyle: {
                color: '#374151',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
            },
            extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 8px;'
        },
        grid: {
            top: '12%',
            left: '3%',
            right: '3%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: pieData.map(item => item.name),
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#6b7280',
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    margin: 12
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                minInterval: 1,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#9ca3af',
                    fontSize: 11,
                    fontFamily: 'Inter, sans-serif'
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#f3f4f6'
                    }
                }
            }
        ],
        series: [
            {
                name: 'Routes',
                type: 'bar',
                barWidth: '32%',
                itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                },
                data: pieData.map(item => ({
                    value: item.value,
                    itemStyle: {
                        color: COLORS[item.name]
                    }
                }))
            }
        ]
    };

    return (
        <div className="dashboard-chart mt-6">
            <SectionHeader
                title="Routes Overview"
                label="Analytics"
                count={totalRoutes}
                countColor="blue"
            />

            <div className="chart-grid">
                {/* 1. DONUT CHART CARD */}
                <div className="chart-card white-bg p-5 rounded-lg shadow-md flex flex-col justify-between">
                    <h3 className="chart-title mb-3">Route Status Distribution</h3>
                    <div className="flex-1 min-h-[240px] relative">
                        <ReactECharts 
                            option={pieOption}
                            style={{ height: '240px', width: '100%' }}
                            opts={{ renderer: 'svg' }}
                        />
                    </div>
                </div>

                {/* 2. BAR CHART CARD */}
                <div className="chart-card white-bg p-5 rounded-lg shadow-md flex flex-col justify-between">
                    <h3 className="chart-title mb-3">Routes Count per Status</h3>
                    <div className="flex-1 min-h-[240px] relative">
                        <ReactECharts 
                            option={barOption}
                            style={{ height: '240px', width: '100%' }}
                            opts={{ renderer: 'svg' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardChart;
