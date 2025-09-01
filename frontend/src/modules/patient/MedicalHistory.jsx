import { useEffect, useState } from "react";
import api from "../../api/axios";

const MedicalHistory = () => {
    const [history, setHistory] = useState([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get("/patients/medical-history");
                setHistory(res.data.medicalHistory);
            } catch (err) {
                console.error("Error fetching history:", err);
                setHistory([]);
            }
        };
        fetchHistory();
    }, []);

    const [formData, setFormData] = useState({
        condition: "",
        diagnosisDate: "",
        treatment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addHistory = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/patients/medical-history", formData);
            const newEntry = res.data.medicalHistory;
            setHistory((prev) => [...prev, newEntry]);

            setFormData({
                condition: "",
                diagnosisDate: "",
                treatment: "",
            });
        } catch (err) {
            console.error("Error adding history:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Medical History
                </h2>

                {/* History List */}
                <div className="space-y-4 mb-10">
                    {history.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No medical history found.
                        </p>
                    ) : (
                        history.map((h) => (
                            <div
                                key={h._id || Math.random()}
                                className="p-5 border rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                            >
                                <p className="text-xl font-semibold text-gray-800 mb-2">
                                    {h.condition}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Treatment:</span> {h.treatment}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Diagnosis Date:</span>{" "}
                                    {new Date(h.diagnosisDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* Add History Form */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add Medical History
                </h2>

                <form
                    onSubmit={addHistory}
                    className="space-y-5 bg-gray-50 p-6 rounded-2xl shadow-inner"
                >
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Condition
                        </label>
                        <input
                            type="text"
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Asthma"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Diagnosis Date
                        </label>
                        <input
                            type="date"
                            name="diagnosisDate"
                            value={formData.diagnosisDate}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Treatment
                        </label>
                        <input
                            type="text"
                            name="treatment"
                            value={formData.treatment}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Inhaler"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Add History
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MedicalHistory;
