import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Calendar, User, CheckCircle, Clock } from "lucide-react";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const res = await api.get("/appointments/my");
            // console.log(res.data.appointments);
            setAppointments(res.data.appointments);
        };
        fetchAppointments();
    }, []);

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

                                {/* Status Badge */}
                                <div className="mt-4 md:mt-0">
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${appt.status === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : appt.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {appt.status.charAt(0).toUpperCase() +
                                            appt.status.slice(1)}
                                    </span>
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
