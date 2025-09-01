import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone } from "lucide-react";

const PatientProfile = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                phone: user.phone || "",
            });
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
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                        <User className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        My Profile
                    </h2>
                    <p className="text-sm text-gray-500">
                        Update your personal details
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            disabled
                            className="w-full pl-10 pr-3 py-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                        />
                    </div>

                    <button
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PatientProfile;
