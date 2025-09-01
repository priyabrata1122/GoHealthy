import { useEffect, useState } from "react";
import api from "../../api/axios";

const CreatePrescription = () => {
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState({});
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

    const handleChange = (id, field, value) => {
        setPrescriptions((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    const handleMedicineChange = (id, index, field, value) => {
        const meds = prescriptions[id]?.medicines || [];
        const updated = [...meds];
        updated[index] = { ...updated[index], [field]: value };
        setPrescriptions((prev) => ({
            ...prev,
            [id]: { ...prev[id], medicines: updated },
        }));
    };

    const addMedicine = (id) => {
        const meds = prescriptions[id]?.medicines || [];
        setPrescriptions((prev) => ({
            ...prev,
            [id]: { ...prev[id], medicines: [...meds, { name: "", dosage: "", duration: "", instructions: "" }] },
        }));
    };

    const submitPrescription = async (id) => {
        const presData = prescriptions[id];
        if (!presData || !presData.medicines?.length) return;

        try {
            setLoading(id);
            await api.post("/prescriptions", {
                appointmentId: id,
                medicines: presData.medicines,
                notes: presData.notes || "",
            });
            setPrescriptions((prev) => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
            alert("Prescription Uploadedd Successfully");
        } catch (err) {
            console.error("Error creating prescription:", err);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="p-6 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-6 mt-6">Create Prescription</h2>
            {appointments.length === 0 ? (
                <p className="text-gray-600">No appointments assigned yet.</p>
            ) : (
                <div className="grid gap-5 w-[80%]">
                    {appointments.map((appt) => (
                        <div
                            key={appt._id}
                            className="p-5 bg-white shadow rounded-lg border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {appt.patient?.name || "Unknown Patient"}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {new Date(appt.date).toLocaleDateString()}{" "}
                                    {new Date(appt.date).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Medicines
                                    </label>
                                    {(prescriptions[appt._id]?.medicines || []).map((med, idx) => (
                                        <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={med.name}
                                                onChange={(e) =>
                                                    handleMedicineChange(appt._id, idx, "name", e.target.value)
                                                }
                                                className="border rounded p-2 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Dosage"
                                                value={med.dosage}
                                                onChange={(e) =>
                                                    handleMedicineChange(appt._id, idx, "dosage", e.target.value)
                                                }
                                                className="border rounded p-2 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Duration"
                                                value={med.duration}
                                                onChange={(e) =>
                                                    handleMedicineChange(appt._id, idx, "duration", e.target.value)
                                                }
                                                className="border rounded p-2 text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Instructions"
                                                value={med.instructions}
                                                onChange={(e) =>
                                                    handleMedicineChange(appt._id, idx, "instructions", e.target.value)
                                                }
                                                className="border rounded p-2 text-sm"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addMedicine(appt._id)}
                                        className="text-blue-600 text-sm mt-1"
                                    >
                                        + Add Medicine
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Notes
                                    </label>
                                    <textarea
                                        rows="2"
                                        placeholder="Additional notes..."
                                        value={prescriptions[appt._id]?.notes || ""}
                                        onChange={(e) =>
                                            handleChange(appt._id, "notes", e.target.value)
                                        }
                                        className="w-full border rounded p-2 text-sm"
                                    ></textarea>
                                </div>

                                <button
                                    onClick={() => submitPrescription(appt._id)}
                                    disabled={loading === appt._id}
                                    className={`w-full px-3 py-2 rounded text-white ${loading === appt._id
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    {loading === appt._id ? "Uploading..." : "Submit Prescription"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreatePrescription;
