import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Calendar, User, Stethoscope } from "lucide-react";

const GetAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const res = await api.get("/admin/appointments");
                setAppointments(res.data.appointments || []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    All Appointments
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment._id}
                                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
                            >
                                {/* Appointment Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <Calendar className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Appointment #{appointment._id.slice(-6)}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {appointment.date
                                                ? new Date(appointment.date).toLocaleDateString()
                                                : "No date"}
                                        </p>
                                    </div>
                                </div>

                                {/* Doctor Details */}
                                <div className="mb-3">
                                    <h4 className="flex items-center gap-2 text-md font-semibold text-gray-700">
                                        <Stethoscope className="h-5 w-5 text-blue-600" />
                                        Doctor
                                    </h4>
                                    {appointment.doctor ? (
                                        <p className="text-sm text-gray-600">
                                            {appointment.doctor.name} <br />
                                            <span className="text-gray-500">
                                                {appointment.doctor.specialization}
                                            </span>
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-400">Not assigned</p>
                                    )}
                                </div>

                                {/* Patient Details */}
                                <div className="mb-3">
                                    <h4 className="flex items-center gap-2 text-md font-semibold text-gray-700">
                                        <User className="h-5 w-5 text-green-600" />
                                        Patient
                                    </h4>
                                    {appointment.patient ? (
                                        <p className="text-sm text-gray-600">
                                            {appointment.patient.name} <br />
                                            <span className="text-gray-500">
                                                {appointment.patient.email}
                                            </span>
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-400">No patient</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <p className="text-sm">
                                        <span className="font-medium">Status: </span>
                                        <span
                                            className={`font-semibold ${appointment.status === "completed"
                                                ? "text-green-600"
                                                : appointment.status === "cancelled"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                                }`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No appointments found.</p>
                )}
            </div>
        </div>
    );
};

export default GetAppointments;
