const Home = () => {
    return (
        <div className="h-178 flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-green-100 px-6 py-12">
            <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Welcome to <span className="text-green-600">GoHealthy</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Your all-in-one healthcare platform. Book doctors, manage appointments, access reports, and keep track of your medical history — all in one place.
                </p>
                
            </div>

            {/* Features Section */}
            <div className="mt-10 grid gap-8 md:grid-cols-3 max-w-5xl w-full">
                <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Book Appointments</h3>
                    <p className="text-gray-600 text-sm">
                        Find the right doctor and book your appointment in just a few clicks.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Manage Health Records</h3>
                    <p className="text-gray-600 text-sm">
                        Store, access, and organize your medical reports securely online.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Track History</h3>
                    <p className="text-gray-600 text-sm">
                        Keep track of your health journey with past appointments and reports.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
