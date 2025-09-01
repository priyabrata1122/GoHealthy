import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    User,
    Calendar,
    FileText,
    ClipboardList,
    Mail,
    Phone,
    Clock,
    DollarSign,
    Briefcase,
} from "lucide-react";

const DoctorDashboard = () => {
    const { user } = useAuth();
    // console.log(user);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="p-4 bg-green-100 rounded-full">
                        <User className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {user?.name || "Doctor"}
                        </h2>
                        <p className="text-lg text-gray-500 mt-2 flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                            {user?.specialization || "Specialization not set"}
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

                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                    Doctor Dashboard
                </h1>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        to="/doctor/profile"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition">
                            <User className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Manage Profile
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Update your professional details and timings.
                        </p>
                    </Link>

                    <Link
                        to="/doctor/appointments"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition">
                            <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            My Appointments
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            View and manage your scheduled appointments.
                        </p>
                    </Link>

                    <Link
                        to="/doctor/create-prescription"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition">
                            <ClipboardList className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Create Prescription
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Write and manage prescriptions for your patients.
                        </p>
                    </Link>

                    <Link
                        to="/doctor/prescriptions"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-yellow-100 rounded-full mb-4 group-hover:bg-yellow-200 transition">
                            <ClipboardList className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Prescriptions
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Manage and issue prescriptions for patients.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
