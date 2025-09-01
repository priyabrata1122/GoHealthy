import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    User,
    CalendarPlus,
    ClipboardList,
    FileText,
    History,
    FolderOpen,
    Stethoscope,
    Phone,
    Mail,
} from "lucide-react";

const PatientDashboard = () => {
    const { user } = useAuth();
    // console.log(user);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Patient Info Card */}
                <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="p-4 bg-green-100 rounded-full">
                        <User className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {user?.name || "Patient"}
                        </h2>
                        <p className="text-lg text-gray-500 mt-2 ">
                            Age: {user?.age || "NA"}
                        </p>
                        <p className="text-lg  text-gray-500 mt-2">
                            Role: {user?.role || "patient"}
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
                    Patient Dashboard
                </h1>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Profile */}
                    <Link
                        to="/patient/profile"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition">
                            <User className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Manage Profile</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Update your personal details and preferences.
                        </p>
                    </Link>

                    {/* Book Appointment */}
                    <Link
                        to="/patient/book"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition">
                            <CalendarPlus className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Book Appointment</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Find doctors and schedule appointments quickly.
                        </p>
                    </Link>

                    {/* My Appointments */}
                    <Link
                        to="/patient/appointments"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-yellow-100 rounded-full mb-4 group-hover:bg-yellow-200 transition">
                            <ClipboardList className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">My Appointments</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            View and manage your upcoming appointments.
                        </p>
                    </Link>

                    {/* Upload Reports */}
                    <Link
                        to="/patient/reports"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition">
                            <FileText className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Upload Reports</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Upload and manage your medical reports securely.
                        </p>
                    </Link>

                    {/* Medical History */}
                    <Link
                        to="/patient/history"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-red-100 rounded-full mb-4 group-hover:bg-red-200 transition">
                            <History className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Medical History</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Track your past medical records and health notes.
                        </p>
                    </Link>

                    {/* Reports List */}
                    <Link
                        to="/patient/getreports"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-indigo-100 rounded-full mb-4 group-hover:bg-indigo-200 transition">
                            <FolderOpen className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">My Reports</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            View and download your uploaded reports.
                        </p>
                    </Link>

                    {/* Prescriptions */}
                    <Link
                        to="/patient/prescriptions"
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
                    >
                        <div className="p-4 bg-teal-100 rounded-full mb-4 group-hover:bg-teal-200 transition">
                            <Stethoscope className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Prescriptions</h3>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            View prescriptions provided by your doctors.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
