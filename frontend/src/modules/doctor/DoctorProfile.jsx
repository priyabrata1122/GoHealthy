import { useEffect, useState } from "react";
import api from "../../api/axios";

const DoctorProfile = () => {
    const [form, setForm] = useState({ name: "", specialization: "", availability: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await api.get("/doctors/profile");
            setForm({
                name: res.data.name,
                specialization: res.data.specialization || "",
                availability: res.data.availability?.join(", ") || "",
            });
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put("/doctors/profile", {
            name: form.name,
            specialization: form.specialization,
            availability: form.availability.split(",").map((a) => a.trim()),
        });
        alert("Profile updated");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
            <h2 className="text-lg font-bold mb-4">Doctor Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="Specialization"
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    name="availability"
                    value={form.availability}
                    onChange={handleChange}
                    placeholder="Availability (comma-separated days)"
                    className="w-full border p-2"
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded">Update</button>
            </form>
        </div>
    );
};

export default DoctorProfile;
