import { useState, useEffect } from "react";
import api from "../../api/axios";

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await api.get("/doctors"); // fetch only approved doctors
            setDoctors(res.data);
        };
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/appointments/book", { doctorId: selectedDoctor, date });
        alert("Appointment booked successfully");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
            <h2 className="text-lg font-bold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                            {doc.name} ({doc.specialization})
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button className="w-full bg-green-600 text-white p-2 rounded">Book</button>
            </form>
        </div>
    );
};

export default BookAppointment;
