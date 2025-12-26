import React, {
    useState,
    useEffect,
    useCallback,
} from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import "./Analytics.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
    const [views, setViews] = useState([]);
    const [countries, setCountries] = useState([]);
    const [devices, setDevices] = useState([]);
    const [total, setTotal] = useState(0);
    const [allVisits, setAllVisits] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdate, setLastUpdate] = useState(
        new Date()
    );

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params:
                    startDate && endDate
                        ? { start: startDate, end: endDate }
                        : {},
            };

            const [
                viewsRes,
                countriesRes,
                totalRes,
                devicesRes,
            ] = await Promise.all([
                axios.get(
                    `${process.env.REACT_APP_API_URL}/analytics/views`,
                    config
                ),
                axios.get(
                    `${process.env.REACT_APP_API_URL}/analytics/countries`,
                    config
                ),
                axios.get(
                    `${process.env.REACT_APP_API_URL}/analytics/total`,
                    config
                ),
                axios.get(
                    `${process.env.REACT_APP_API_URL}/analytics/devices`,
                    config
                ),
            ]);

            setViews(viewsRes.data);
            setCountries(countriesRes.data);
            setTotal(totalRes.data.total);
            setDevices(devicesRes.data);
            setLastUpdate(new Date());
        } catch (err) {
            setError("Failed to load analytics data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate]);

    const fetchAllVisits = useCallback(async (page = 1) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/analytics/all-visits`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: { page, limit: 50 },
                }
            );
            setAllVisits(response.data.visits);
            setPagination(response.data.pagination);
            setCurrentPage(page);
        } catch (err) {
            console.error(
                "Failed to load all visits:",
                err
            );
        }
    }, []);

    useEffect(() => {
        fetchAnalytics();
        fetchAllVisits();

        // Auto-refresh every 2 minutes
        const interval = setInterval(() => {
            fetchAnalytics();
            fetchAllVisits();
        }, 120000); // 2 minutes

        return () => clearInterval(interval);
    }, [fetchAnalytics, fetchAllVisits]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Prepare pie chart data
    const pieData = {
        labels: devices.map((device) => device._id),
        datasets: [
            {
                data: devices.map((device) => device.count),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed;
                        const total =
                            context.dataset.data.reduce(
                                (a, b) => a + b,
                                0
                            );
                        const percentage = (
                            (value / total) *
                            100
                        ).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="analytics">
            <h1>Blog Analytics</h1>
            <div className="last-update">
                Last updated:{" "}
                {lastUpdate.toLocaleTimeString()}
            </div>

            <div className="filters">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }
                    />
                </label>
                <button onClick={fetchAnalytics}>
                    Filter
                </button>
            </div>

            <div className="stats">
                <div className="stat">
                    <h2>Total Views</h2>
                    <p>{total}</p>
                </div>
            </div>

            <div className="charts">
                <div className="chart">
                    <h2>Views per Date</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {views.map((view) => (
                                <tr key={view._id}>
                                    <td>{view._id}</td>
                                    <td>{view.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="chart">
                    <h2>Views by Country</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.map((country) => (
                                <tr key={country._id}>
                                    <td>{country._id}</td>
                                    <td>{country.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {devices.length > 0 && (
                <div className="pie-chart-container">
                    <h2>Device Statistics</h2>
                    <div className="pie-chart-wrapper">
                        <Pie
                            data={pieData}
                            options={pieOptions}
                        />
                    </div>
                </div>
            )}

            <div className="all-visits">
                <h2>
                    All Visits (
                    {pagination?.totalVisits || 0})
                </h2>
                <div className="pagination-controls">
                    <button
                        onClick={() =>
                            fetchAllVisits(currentPage - 1)
                        }
                        disabled={!pagination?.hasPrev}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of{" "}
                        {pagination?.totalPages || 1}
                    </span>
                    <button
                        onClick={() =>
                            fetchAllVisits(currentPage + 1)
                        }
                        disabled={!pagination?.hasNext}
                    >
                        Next
                    </button>
                </div>
                <div className="table-container">
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>IP</th>
                                <th>Country</th>
                                <th>Region</th>
                                <th>City</th>
                                <th>Date</th>
                                <th>Page</th>
                                <th>Device</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allVisits.map(
                                (visit, index) => {
                                    const userAgent =
                                        visit.userAgent ||
                                        "";
                                    let device = "-";
                                    if (
                                        userAgent.includes(
                                            "Mobile"
                                        ) ||
                                        userAgent.includes(
                                            "Android"
                                        ) ||
                                        userAgent.includes(
                                            "iPhone"
                                        )
                                    ) {
                                        device = "Mobile";
                                    } else if (
                                        userAgent.includes(
                                            "Tablet"
                                        ) ||
                                        userAgent.includes(
                                            "iPad"
                                        )
                                    ) {
                                        device = "Tablet";
                                    } else if (
                                        userAgent.includes(
                                            "Windows"
                                        ) ||
                                        userAgent.includes(
                                            "Mac"
                                        ) ||
                                        userAgent.includes(
                                            "Linux"
                                        )
                                    ) {
                                        device = "Desktop";
                                    }
                                    return (
                                        <tr
                                            key={`${visit.ip}-${visit.date}-${index}`}
                                        >
                                            <td>
                                                {visit.ip}
                                            </td>
                                            <td>
                                                {visit.country ||
                                                    "Unknown"}
                                            </td>
                                            <td>
                                                {visit.region ||
                                                    "-"}
                                            </td>
                                            <td>
                                                {visit.city ||
                                                    "-"}
                                            </td>
                                            <td>
                                                {new Date(
                                                    visit.date
                                                ).toLocaleString()}
                                            </td>
                                            <td>
                                                {visit.path}
                                            </td>
                                            <td>
                                                {device}
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
