import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const PatientProfile = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        if (user) {
            setForm({ name: user.name, email: user.email, phone: user.phone || "" });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put("/patients/profile", form);
        alert("Profile updated successfully");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
            <h2 className="text-lg font-bold mb-4">My Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100"
                />
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded">Update</button>
            </form>
        </div>
    );
};

export default PatientProfile;
