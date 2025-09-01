import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const DoctorProfile = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        specialization: "",
        experience: "",
        consultationFee: "",
        availability: [{ day: "", slots: [""] }],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/doctors/profile");
                const data = res.data.doctor || {};

                setForm({
                    specialization: data.specialization || "",
                    experience: data.experience || "",
                    consultationFee: data.consultationFee || "",
                    availability:
                        data.availability && data.availability.length > 0
                            ? data.availability
                            : [{ day: "", slots: [""] }],
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updated = [...form.availability];
        updated[index][field] = value;
        setForm({ ...form, availability: updated });
    };

    const handleSlotChange = (dayIndex, slotIndex, value) => {
        const updated = [...form.availability];
        updated[dayIndex].slots[slotIndex] = value;
        setForm({ ...form, availability: updated });
    };

    const addDay = () => {
        setForm({
            ...form,
            availability: [...form.availability, { day: "", slots: [""] }],
        });
    };

    const addSlot = (dayIndex) => {
        const updated = [...form.availability];
        updated[dayIndex].slots.push("");
        setForm({ ...form, availability: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put("/doctors/profile", {
                specialization: form.specialization,
                experience: Number(form.experience),
                consultationFee: Number(form.consultationFee),
                availability: form.availability,
            });
            alert("Profile updated successfully");
            navigate("/doctor/dashboard");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update profile");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
            <h2 className="text-xl font-bold mb-6">Update Doctor Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="Specialization"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Experience (years)"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    name="consultationFee"
                    value={form.consultationFee}
                    onChange={handleChange}
                    placeholder="Consultation Fee"
                    className="w-full border p-2 rounded"
                />

                <div className="space-y-4">
                    <h3 className="font-semibold">Availability</h3>
                    {form.availability.map((day, dayIndex) => (
                        <div key={dayIndex} className="border p-3 rounded space-y-2">
                            <input
                                type="text"
                                value={day.day}
                                onChange={(e) =>
                                    handleAvailabilityChange(dayIndex, "day", e.target.value)
                                }
                                placeholder="Day (e.g., Monday)"
                                className="w-full border p-2 rounded"
                            />
                            {day.slots.map((slot, slotIndex) => (
                                <input
                                    key={slotIndex}
                                    type="text"
                                    value={slot}
                                    onChange={(e) =>
                                        handleSlotChange(dayIndex, slotIndex, e.target.value)
                                    }
                                    placeholder="Slot (e.g., 10:00-11:00)"
                                    className="w-full border p-2 rounded"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => addSlot(dayIndex)}
                                className="bg-indigo-500 text-white px-3 py-1 rounded"
                            >
                                + Add Slot
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDay}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        + Add Day
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default DoctorProfile;
