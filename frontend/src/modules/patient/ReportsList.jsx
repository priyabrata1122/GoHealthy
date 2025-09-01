import { useEffect, useState } from "react";
import api from "../../api/axios";

const ReportsList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const res = await api.get("/patients/reports");
            setReports(res.data);
        };
        fetchReports();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    My Reports
                </h2>

                {reports.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No reports uploaded.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {reports.reports.map((r) => (
                            <div
                                key={r._id}
                                className="p-5 border rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                            >
                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                    {r.reportName}
                                </p>
                                <a
                                    href={r.reportUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block text-blue-600 font-medium hover:underline mb-2"
                                >
                                    View Report
                                </a>
                                <p className="text-sm text-gray-500">
                                    Uploaded on {new Date(r.date).toLocaleDateString()} at{" "}
                                    {new Date(r.date).toLocaleTimeString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsList;
