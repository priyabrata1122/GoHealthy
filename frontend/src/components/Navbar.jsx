import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between items-center bg-white shadow px-6 py-3">
            <Link to="/" className="font-bold text-lg">GoHealthy</Link>

            <div className="flex gap-4 items-center">
                {!user && (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}

                {user?.role === "patient" && (
                    <>
                        <Link to="/patient/dashboard" className="hover:underline">Dashboard</Link>
                        <Link to="/patient/profile" className="hover:underline">Profile</Link>
                        <Link to="/patient/book" className="hover:underline">Book</Link>
                        <Link to="/patient/appointments" className="hover:underline">Appointments</Link>
                        <Link to="/patient/reports" className="hover:underline">Reports</Link>
                        <Link to="/patient/history" className="hover:underline">History</Link>
                    </>
                )}

                {user && (
                    <>
                        <span className="text-sm text-gray-600">
                            Hi, {user.name} ({user.role})
                        </span>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
