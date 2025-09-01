import { useState, useEffect } from "react";
import api from "../../api/axios";
import { CalendarDays, User, FileText } from "lucide-react";

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await api.get("/doctors");
            setDoctors(res.data.doctors);
        };
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDoctor || !date) {
            return alert("Please select a doctor and date");
        }

        setLoading(true);
        try {
            await api.post("/appointments/book", {
                doctorId: selectedDoctor,
                date,
                notes,
            });
            alert("Appointment booked successfully");
            setSelectedDoctor("");
            setDate("");
            setNotes("");
        } catch (err) {
            console.error("Error booking appointment:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Book an Appointment
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Doctor Dropdown */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Select Doctor
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                            <select
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">-- Choose a Doctor --</option>
                                {doctors.map((doc) => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.name} ({doc.specialization})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Select Date
                        </label>
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Notes Input */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">
                            Notes (Optional)
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                            <textarea
                                name="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any additional notes here..."
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-medium transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                    >
                        {loading ? "Booking..." : "Confirm Appointment"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
