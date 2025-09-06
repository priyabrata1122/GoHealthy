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

// Doctor Routes
import DoctorDashboard from "./modules/doctor/DoctorDashboard";
import DoctorProfile from "./modules/doctor/DoctorProfile";
import DoctorAppointments from "./modules/doctor/MyAppointments";
import GetPrescriptions from "./modules/doctor/GetPrescriptions";
import CreatePrescription from "./modules/doctor/CreatePrescription";

// Admin Routes
import AdminDashboard from "./modules/admin/AdminDashboard";
import GetPatients from "./modules/admin/GetPatients";
import GetDoctors from "./modules/admin/GetDoctors";
import GetAppointments from "./modules/admin/GetAppointments";
import GetStatistics from "./modules/admin/GetStatistics";

const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/login", element: <><Navbar /><Login /></> },
    { path: "/register", element: <><Navbar /><Register /></> },

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
    {
        path: "/doctor/prescriptions",
        element: (
            <ProtectedRoute role="doctor">
                <><Navbar /><GetPrescriptions /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/doctor/create-prescription",
        element: (
            <ProtectedRoute role="doctor">
                <><Navbar /><CreatePrescription /></>
            </ProtectedRoute>
        ),
    },

    //Admin Route
    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute role="admin">
                <><Navbar /><AdminDashboard /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/patients",
        element: (
            <ProtectedRoute role="admin">
                <><Navbar /><GetPatients /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/doctors",
        element: (
            <ProtectedRoute role="admin">
                <><Navbar /><GetDoctors /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/appointments",
        element: (
            <ProtectedRoute role="admin">
                <><Navbar /><GetAppointments /></>
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/stats",
        element: (
            <ProtectedRoute role="admin">
                <><Navbar /><GetStatistics /></>
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
