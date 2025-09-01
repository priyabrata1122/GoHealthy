import { useEffect, useState } from "react";
import api from "../../api/axios";

const GetPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const res = await api.get("/prescriptions/doctor");
                // console.log(res);
                setPrescriptions(res.data.prescriptions || []);
            } catch (err) {
                console.error("Error fetching prescriptions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrescriptions();
    }, []);

    return (
        <div className="p-6 flex flex-col">
            <div className="flex flex-col justify-center items-center"><h2 className="text-3xl font-bold mb-6">My Prescriptions</h2></div>
            {loading ? (
                <p className="text-gray-600">Loading prescriptions...</p>
            ) : prescriptions.length === 0 ? (
                <p className="text-gray-600">No prescriptions created yet.</p>
            ) : (
                <div className="grid gap-4">
                    {prescriptions.map((pres) => (
                        <div
                            key={pres._id}
                            className="p-5 bg-white shadow rounded-lg border border-gray-200"
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                Patient: {pres.patient?.name || "Unknown"}
                            </h3>
                            <p className="text-lg text-gray-600 mb-1">
                                <strong>Date:</strong>{" "}
                                {new Date(pres.updatedAt).toLocaleDateString() || new Date(pres.createdAt).toLocaleDateString()}
                            </p>
                            <div className="mb-2">
                                <strong className="text-lg text-gray-700">Medications:</strong>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {pres.medicines?.map((med, idx) => (
                                        <li key={idx} className="text-md">
                                            {med.name} - {med.dosage} ({med.duration})
                                        </li>
                                    )) || <li>No medications listed</li>}
                                </ul>
                            </div>
                            {pres.notes && (
                                <p className="text-md text-gray-600">
                                    <strong>Notes:</strong> {pres.notes}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetPrescriptions;
