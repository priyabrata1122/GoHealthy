import { useEffect, useState } from "react";
import api from "../../api/axios";

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            const res = await api.get("/prescriptions/my");
            // console.log(res.data.prescriptions);
            setPrescriptions(res.data.prescriptions); // ✅ set full array
        };
        fetchPrescriptions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    My Prescriptions
                </h2>

                {prescriptions.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No prescriptions assigned yet.
                    </p>
                ) : (
                    <div className="space-y-8">
                        {prescriptions.map((prescription) => (
                            <div
                                key={prescription._id}
                                className="p-6 border rounded-xl bg-gray-50 shadow-md space-y-6"
                            >
                                {/* Doctor Details */}
                                <div className="p-5 border rounded-xl bg-white shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                        Doctor Details
                                    </h3>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Name:</span>{" "}
                                        {prescription.doctor.name}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Specialization:</span>{" "}
                                        {prescription.doctor.specialization}
                                    </p>
                                </div>

                                {/* Appointment Details */}
                                <div className="p-5 border rounded-xl bg-white shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                        Appointment Details
                                    </h3>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Date:</span>{" "}
                                        {new Date(
                                            prescription.appointment.date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Status:</span>{" "}
                                        {prescription.appointment.status}
                                    </p>
                                </div>

                                {/* Medicine Details */}
                                <div className="p-5 border rounded-xl bg-white shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                        Medicine Details
                                    </h3>
                                    <div className="space-y-4">
                                        {prescription.medicines.map((m) => (
                                            <div
                                                key={m._id}
                                                className="p-4 border rounded-lg bg-gray-50 shadow-inner"
                                            >
                                                <p className="text-gray-700">
                                                    <span className="font-medium">Name:</span> {m.name}
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-medium">Dosage:</span>{" "}
                                                    {m.dosage}
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-medium">Instructions:</span>{" "}
                                                    {m.instructions}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes */}
                                {prescription.notes && (
                                    <div className="p-5 border rounded-xl bg-white shadow-sm">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            Notes
                                        </h3>
                                        <p className="text-gray-700">{prescription.notes}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Prescriptions;
