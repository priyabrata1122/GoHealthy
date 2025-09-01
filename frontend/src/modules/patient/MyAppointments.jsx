import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Calendar, User } from "lucide-react";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get("/appointments/my");
                setAppointments(res.data.appointments || []);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        try {
            setLoading(id);
            await api.put(`/appointments/${id}/cancel`);
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === id ? { ...appt, status: "cancelled" } : appt
                )
            );
        } catch (err) {
            console.error("Error cancelling appointment:", err);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    My Appointments
                </h2>

                {appointments.length === 0 ? (
                    <div className="text-center text-gray-500 bg-white py-12 rounded-xl shadow">
                        <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-lg">No appointments found.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {appointments.map((appt) => (
                            <div
                                key={appt._id}
                                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition"
                            >
                                {/* Left Section */}
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <User className="h-5 w-5 text-green-600" />
                                        <span className="font-semibold">{appt.doctor.name}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        {new Date(appt.date).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Right Section */}
                                <div className="mt-4 md:mt-0 flex flex-col items-end gap-3">
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${appt.status === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : appt.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : appt.status === "cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {appt.status.charAt(0).toUpperCase() +
                                            appt.status.slice(1)}
                                    </span>

                                    {appt.status !== "cancelled" && (
                                        <button
                                            onClick={() => handleCancel(appt._id)}
                                            disabled={loading === appt._id}
                                            className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${loading === appt._id
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-red-600 hover:bg-red-700"
                                                }`}
                                        >
                                            {loading === appt._id ? "Cancelling..." : "Cancel Appointment"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
