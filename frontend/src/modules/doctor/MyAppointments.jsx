import { useEffect, useState } from "react";
import api from "../../api/axios";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
};

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [statusDrafts, setStatusDrafts] = useState({});
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get("/appointments/doctor");
                setAppointments(res.data.appointments || []);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            }
        };
        fetchAppointments();
    }, []);

    const handleSelectChange = (id, value) => {
        setStatusDrafts((prev) => ({ ...prev, [id]: value }));
    };

    const updateStatus = async (id) => {
        const newStatus = statusDrafts[id];
        if (!newStatus) return;

        try {
            setLoading(id);
            await api.put(`/appointments/${id}/status`, { status: newStatus });
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === id ? { ...appt, status: newStatus } : appt
                )
            );
            setStatusDrafts((prev) => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="p-6 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-6 mt-6">My Appointments</h2>
            {appointments.length === 0 ? (
                <p className="text-gray-600">No appointments assigned yet.</p>
            ) : (
                <div className="grid gap-5 w-[80%]">
                    {appointments.map((appt) => (
                        <div
                            key={appt._id}
                            className="p-5 bg-white shadow rounded-lg border border-gray-200 "
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {appt.patient?.name || "Unknown Patient"}
                                </h3>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[appt.status] || "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {appt.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                <strong>Date:</strong>{" "}
                                {new Date(appt.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Time:</strong>{" "}
                                {new Date(appt.date).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            <div className="mt-4 space-y-2">
                                <select
                                    value={statusDrafts[appt._id] || appt.status}
                                    onChange={(e) => handleSelectChange(appt._id, e.target.value)}
                                    className="w-full border rounded p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {statusDrafts[appt._id] && statusDrafts[appt._id] !== appt.status && (
                                    <button
                                        onClick={() => updateStatus(appt._id)}
                                        disabled={loading === appt._id}
                                        className={`w-full px-3 py-2 rounded text-white ${loading === appt._id
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                            }`}
                                    >
                                        {loading === appt._id ? "Updating..." : "Update Status"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointments;
