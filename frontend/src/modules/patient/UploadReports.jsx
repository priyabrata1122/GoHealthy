import { useState } from "react";
import api from "../../api/axios";
import { UploadCloud, FileText } from "lucide-react";

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
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Upload Medical Report
                </h2>

                {/* Upload Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Upload Box */}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-green-500 transition">
                        <UploadCloud className="h-10 w-10 text-gray-400 mb-3" />
                        <span className="text-gray-600 font-medium">
                            {file ? (
                                <span className="flex items-center gap-2 text-green-600">
                                    <FileText className="h-5 w-5" /> {file.name}
                                </span>
                            ) : (
                                "Click to select or drag and drop your report"
                            )}
                        </span>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                        />
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
                    >
                        Upload Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadReports;
