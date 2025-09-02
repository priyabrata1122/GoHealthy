import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    User,
    Users,
    Stethoscope,
    ClipboardList,
    FileText,
    BarChart3,
    Mail,
    Phone,
} from "lucide-react";

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Admin Info Card */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="p-4 bg-green-100 rounded-full">
                        <User className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {user?.name || "Admin"}
                        </h2>
                        <p className="text-lg text-gray-500 mt-2">
                            Role: {user?.role || "admin"}
                        </p>
                        <p className="flex items-center text-gray-600 mt-1">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            {user?.email || "No email"}
                        </p>
                        <p className="flex items-center text-gray-600 mt-1">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            {user?.phone || "No phone number"}
                        </p>
                    </div>
                </div>

                {/* Feature Grid */}
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                    Admin Dashboard
                </h1>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Get All Patients */}
                    <Link
                        to="/admin/patients"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition">
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">All Patients</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            View and manage all registered patients.
                        </p>
                    </Link>

                    {/* Get All Doctors */}
                    <Link
                        to="/admin/doctors"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition">
                            <Stethoscope className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">All Doctors</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Review and manage all registered doctors.
                        </p>
                    </Link>

                    {/* Get All Appointments */}
                    <Link
                        to="/admin/appointments"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-yellow-100 rounded-full mb-4 group-hover:bg-yellow-200 transition">
                            <ClipboardList className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">All Appointments</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Monitor and manage all appointments.
                        </p>
                    </Link>

                    {/* Get All Doctor Prescriptions
                    <Link
                        to="/admin/prescriptions"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition">
                            <FileText className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">All Prescriptions</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Access all prescriptions issued by doctors.
                        </p>
                    </Link> */}

                    {/* Get Stats */}
                    <Link
                        to="/admin/stats"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-red-100 rounded-full mb-4 group-hover:bg-red-200 transition">
                            <BarChart3 className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            View platform stats: doctors, patients, appointments.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
