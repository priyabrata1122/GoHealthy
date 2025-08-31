import { useState } from "react";
import api from "../../api/axios";

const UploadReports = () => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("report", file);

        await api.post("/patients/upload-report", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Report uploaded successfully!");
        setFile(null);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
            <h2 className="text-lg font-bold mb-4">Upload Report</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border p-2"
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadReports;
