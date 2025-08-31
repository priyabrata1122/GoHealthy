import { Link } from "react-router-dom";

const PatientDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
            <div className="grid grid-cols-2 gap-6">
                <Link to="/patient/profile" className="p-4 bg-white shadow rounded-lg hover:bg-gray-50">
                    Manage Profile
                </Link>
                <Link to="/patient/book" className="p-4 bg-white shadow rounded-lg hover:bg-gray-50">
                    Book Appointment
                </Link>
                <Link to="/patient/appointments" className="p-4 bg-white shadow rounded-lg hover:bg-gray-50">
                    My Appointments
                </Link>
                <Link to="/patient/reports" className="p-4 bg-white shadow rounded-lg hover:bg-gray-50">
                    Upload Reports
                </Link>
            </div>
        </div>
    );
};

export default PatientDashboard;
