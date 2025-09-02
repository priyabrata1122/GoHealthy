import { useEffect, useState } from "react";
import api from "../../api/axios";
import { User } from "lucide-react";

const GetDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get("/admin/doctors");
                setDoctors(res.data.doctors || []);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    // Toggle doctor card open/close
    const handleSelectDoctor = (doctorId) => {
        setSelectedDoctor((prev) => (prev === doctorId ? null : doctorId));
    };

    // Approve or reject doctor
    const handleStatusChange = async (doctorId, action) => {
        setLoading(true);
        try {
            const res = await api.put(`/admin/doctors/${doctorId}/${action}`);
            // Update doctors state with new isApproved value
            setDoctors((prevDoctors) =>
                prevDoctors.map((doc) =>
                    doc._id === doctorId ? { ...doc, isApproved: res.data.isApproved } : doc
                )
            );
        } catch (error) {
            console.error(`Error trying to ${action} doctor:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    All Doctors
                </h2>

                {/* Doctors List */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            onClick={() => handleSelectDoctor(doctor._id)}
                            className={`cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-lg transition ${selectedDoctor === doctor._id ? "border-2 border-green-500" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{doctor.email}</p>
                                    <p className="text-sm text-gray-400">
                                        Status:{" "}
                                        <span
                                            className={`font-medium ${doctor.isApproved ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {doctor.isApproved ? "Approved" : "Rejected"}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Expanded Doctor Card */}
                            {selectedDoctor === doctor._id && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p>
                                        <span className="font-medium">Specialization:</span>{" "}
                                        {doctor.specialization || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Phone:</span>{" "}
                                        {doctor.phone || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Experience:</span>{" "}
                                        {doctor.experience || "N/A"} years
                                    </p>

                                    {/* Action Button (only one at a time) */}
                                    <div className="flex gap-4 mt-4">
                                        {doctor.isApproved ? (
                                            <button
                                                disabled={loading}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChange(doctor._id, "reject");
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        ) : (
                                            <button
                                                disabled={loading}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChange(doctor._id, "approve");
                                                }}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GetDoctors;
