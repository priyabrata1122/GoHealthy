import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/Login";
import Register from "./modules/auth/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

// Patient pages
import PatientDashboard from "./modules/patient/PatientDashboard";
import PatientProfile from "./modules/patient/PatientProfile";
import BookAppointment from "./modules/patient/BookAppointment";
import MyAppointments from "./modules/patient/MyAppointments";
import UploadReports from "./modules/patient/UploadReports";
import MedicalHistory from "./modules/patient/MedicalHistory";
import ProtectedRoute from "./router/ProtectedRoute";

const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // 🟢 Patient Routes
    {
        path: "/patient/dashboard",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><PatientDashboard /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/patient/profile",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><PatientProfile /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/patient/book",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><BookAppointment /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/patient/appointments",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><MyAppointments /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/patient/reports",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><UploadReports /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/patient/history",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><MedicalHistory /></>
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
