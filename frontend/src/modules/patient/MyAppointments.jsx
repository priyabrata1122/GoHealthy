import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const res = await api.get("/appointments/my");
            setAppointments(res.data);
        };
        fetchAppointments();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <ul className="space-y-3">
                    {appointments.map((appt) => (
                        <li key={appt._id} className="p-4 border rounded bg-white shadow">
                            <p><strong>Doctor:</strong> {appt.doctor.name}</p>
                            <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {appt.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyAppointments;
