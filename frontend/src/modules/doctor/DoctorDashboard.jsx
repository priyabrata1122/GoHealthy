import { Link } from "react-router-dom";

const DoctorDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
            <div className="grid grid-cols-2 gap-6">
                <Link to="/doctor/profile" className="p-4 bg-white shadow rounded hover:bg-gray-50">
                    My Profile
                </Link>
                <Link to="/doctor/appointments" className="p-4 bg-white shadow rounded hover:bg-gray-50">
                    My Appointments
                </Link>
                <Link to="/doctor/reports" className="p-4 bg-white shadow rounded hover:bg-gray-50">
                    Patient Reports
                </Link>
            </div>
        </div>
    );
};

export default DoctorDashboard;
