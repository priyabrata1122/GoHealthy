import { useEffect, useState } from "react";
import api from "../../api/axios";

const MedicalHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await api.get("/patients/history");
            setHistory(res.data);
        };
        fetchHistory();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Medical History</h2>
            {history.length === 0 ? (
                <p>No medical records found.</p>
            ) : (
                <ul className="space-y-3">
                    {history.map((h) => (
                        <li key={h._id} className="p-4 border rounded bg-white shadow">
                            <p><strong>Date:</strong> {new Date(h.date).toLocaleDateString()}</p>
                            <p><strong>Notes:</strong> {h.notes}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MedicalHistory;
