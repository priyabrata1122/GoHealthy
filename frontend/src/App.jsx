import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/Login";
import Register from "./modules/auth/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./router/ProtectedRoute";

// Patient pages
import PatientDashboard from "./modules/patient/PatientDashboard";
import PatientProfile from "./modules/patient/PatientProfile";
import BookAppointment from "./modules/patient/BookAppointment";
import MyAppointments from "./modules/patient/MyAppointments";
import UploadReports from "./modules/patient/UploadReports";
import MedicalHistory from "./modules/patient/MedicalHistory";
import Prescriptions from "./modules/patient/Prescriptions";
import ReportsList from "./modules/patient/ReportsList";

import DoctorDashboard from "./modules/doctor/DoctorDashboard";
import DoctorProfile from "./modules/doctor/DoctorProfile";
import DoctorAppointments from "./modules/doctor/MyAppointments";

const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // Patient Routes
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
    {
        path: "/patient/getreports",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><ReportsList /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/patient/prescriptions",
        element: (
            <ProtectedRoute role="patient">
                <><Navbar /><Prescriptions /></>
            </ProtectedRoute>
        ),
    },


    //Doctor Route
    {
        path: "/doctor/dashboard",
        element: (
            <ProtectedRoute role="doctor">
                <><Navbar /><DoctorDashboard /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/doctor/profile",
        element: (
            <ProtectedRoute role="doctor">
                <><Navbar /><DoctorProfile /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/doctor/appointments",
        element: (
            <ProtectedRoute role="doctor">
                <><Navbar /><DoctorAppointments /></>
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
