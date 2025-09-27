import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                age: user.age || "",
                gender: user.gender || "",
                address: user.address || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/patients/profile", form);
            toast("Profile updated successfully");
            setTimeout(() => {
                navigate("/patient/dashboard");
            }, 1000);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
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
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Email (disabled) */}
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

                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Age */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="relative">
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full pl-3 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                            required
                        >
                            <option value="">-- Select Gender --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Address"
                            rows="3"
                            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold transition shadow-md ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PatientProfile;
