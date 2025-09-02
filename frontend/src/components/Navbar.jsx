import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Brand */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold text-green-600 tracking-tight hover:text-green-700 transition-colors"
                >
                    GoHealthy
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-sm transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {user?.role === "patient" && (
                        <Link
                            to="/patient/dashboard"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user?.role === "doctor" && (
                        <Link
                            to="/doctor/dashboard"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link
                            to="/admin/dashboard"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                Hi, <span className="font-medium">{user.name}</span> ( {user.role.toUpperCase()} )
                            </span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 shadow-sm transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
