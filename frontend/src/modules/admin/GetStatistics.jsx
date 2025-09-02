import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
    Users,
    Stethoscope,
    Calendar,
    Activity,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from "recharts";

const GetStatistics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await api.get("/admin/stats");
                setStats(res.data.stats || {});
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const summaryCards = [
        {
            title: "Total Patients",
            value: stats?.totalPatients || 0,
            icon: <Users className="h-8 w-8 text-blue-600" />,
            color: "bg-blue-100",
        },
        {
            title: "Total Doctors",
            value: stats?.totalDoctors || 0,
            icon: <Stethoscope className="h-8 w-8 text-green-600" />,
            color: "bg-green-100",
        },
        {
            title: "Total Appointments",
            value: stats?.totalAppointments || 0,
            icon: <Calendar className="h-8 w-8 text-purple-600" />,
            color: "bg-purple-100",
        },
        {
            title: "Active Appointments",
            value: stats?.activeAppointments || 0,
            icon: <Activity className="h-8 w-8 text-orange-600" />,
            color: "bg-orange-100",
        },
    ];

    // Mocked data examples (replace with API response if available)
    const appointmentsPerDoctor = stats?.appointmentsPerDoctor || [
        { doctor: "Dr. Smith", count: 12 },
        { doctor: "Dr. Brown", count: 8 },
        { doctor: "Dr. Lee", count: 15 },
    ];

    const appointmentsOverTime = stats?.appointmentsOverTime || [
        { date: "Jan", count: 20 },
        { date: "Feb", count: 35 },
        { date: "Mar", count: 28 },
        { date: "Apr", count: 45 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Hospital Statistics
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading statistics...</p>
                ) : stats ? (
                    <>
                        {/* Summary Cards */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                            {summaryCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-full ${card.color}`}>
                                            {card.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{card.title}</p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {card.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="grid gap-10 lg:grid-cols-2">
                            {/* Bar Chart: Appointments per Doctor */}
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Appointments per Doctor
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={appointmentsPerDoctor}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="doctor" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Line Chart: Appointments Over Time */}
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Appointments Over Time
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={appointmentsOverTime}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            dot={{ r: 5 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">No statistics available.</p>
                )}
            </div>
        </div>
    );
};

export default GetStatistics;
