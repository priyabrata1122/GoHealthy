import { useEffect, useState } from "react";
import api from "../../api/axios";
import { User, FileText, ClipboardList } from "lucide-react";

const GetPatients = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [profile, setProfile] = useState(null);
    const [reports, setReports] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await api.get("/admin/patients");
                setPatients(res.data.patients || []);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchPatients();
    }, []);

    // Toggle patient details
    const handleSelectPatient = async (patientId) => {
        if (selectedPatient === patientId) {
            // If already open, close it
            setSelectedPatient(null);
            setProfile(null);
            setReports([]);
            setMedicalHistory([]);
            return;
        }

        setSelectedPatient(patientId);
        setLoading(true);
        try {
            const [profileRes, reportsRes, historyRes] = await Promise.all([
                api.get(`/admin/patients/${patientId}`),
                api.get(`/admin/patients/${patientId}/reports`),
                api.get(`/admin/patients/${patientId}/medical-history`),
            ]);

            setProfile(profileRes.data.patient || {});
            setReports(reportsRes.data.reports || []);
            setMedicalHistory(historyRes.data.medicalHistory || []);
        } catch (error) {
            console.error("Error fetching patient details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    All Patients
                </h2>

                {/* Patients List */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {patients.map((patient) => (
                        <div
                            key={patient._id}
                            onClick={() => handleSelectPatient(patient._id)}
                            className={`cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-lg transition ${selectedPatient === patient._id
                                    ? "border-2 border-green-500"
                                    : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <User className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {patient.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{patient.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Patient Details Section */}
                {selectedPatient && (
                    <div className="mt-10 bg-white rounded-xl shadow p-6">
                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading patient data...
                            </p>
                        ) : (
                            <>
                                {/* Profile */}
                                <section className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        Profile
                                    </h3>
                                    {profile ? (
                                        <div className="space-y-2">
                                            <p>
                                                <span className="font-medium">Name:</span>{" "}
                                                {profile.name}
                                            </p>
                                            <p>
                                                <span className="font-medium">Email:</span>{" "}
                                                {profile.email}
                                            </p>
                                            <p>
                                                <span className="font-medium">Phone:</span>{" "}
                                                {profile.phone}
                                            </p>
                                            <p>
                                                <span className="font-medium">Age:</span>{" "}
                                                {profile.age}
                                            </p>
                                            <p>
                                                <span className="font-medium">Gender:</span>{" "}
                                                {profile.gender}
                                            </p>
                                            <p>
                                                <span className="font-medium">Address:</span>{" "}
                                                {profile.address}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No profile found.</p>
                                    )}
                                </section>

                                {/* Reports */}
                                <section className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FileText className="h-6 w-6 text-purple-600" /> Reports
                                    </h3>
                                    {reports.length > 0 ? (
                                        <ul className="space-y-3">
                                            {reports.map((report) => (
                                                <li
                                                    key={report._id}
                                                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                                                >
                                                    <p className="font-medium text-gray-800">
                                                        {report.reportName || "Untitled Report"}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Date:{" "}
                                                        {report.date
                                                            ? new Date(
                                                                report.date
                                                            ).toLocaleDateString()
                                                            : "N/A"}
                                                    </p>
                                                    {report.reportUrl && (
                                                        <a
                                                            href={report.reportUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline text-sm"
                                                        >
                                                            View Report
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No reports found.</p>
                                    )}
                                </section>

                                {/* Medical History */}
                                <section>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <ClipboardList className="h-6 w-6 text-blue-600" /> Medical
                                        History
                                    </h3>
                                    {medicalHistory.length > 0 ? (
                                        <ul className="space-y-3">
                                            {medicalHistory.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                                                >
                                                    <p className="font-medium text-gray-800">
                                                        {item.condition || "Unknown Condition"}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Diagnosis Date:{" "}
                                                        {item.diagnosisDate
                                                            ? new Date(
                                                                item.diagnosisDate
                                                            ).toLocaleDateString()
                                                            : "N/A"}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Treatment:{" "}
                                                        {item.treatment || "Not specified"}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">
                                            No medical history found.
                                        </p>
                                    )}
                                </section>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetPatients;
