import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const res = await api.get("/appointments/doctor"); // backend route for doctor
            setAppointments(res.data);
        };
        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        await api.put(`/appointments/${id}/status`, { status });
        setAppointments((prev) =>
            prev.map((a) => (a._id === id ? { ...a, status } : a))
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments assigned yet.</p>
            ) : (
                <ul className="space-y-3">
                    {appointments.map((appt) => (
                        <li key={appt._id} className="p-4 border rounded bg-white shadow">
                            <p><strong>Patient:</strong> {appt.patient.name}</p>
                            <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {appt.status}</p>
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => updateStatus(appt._id, "approved")}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => updateStatus(appt._id, "rejected")}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyAppointments;
