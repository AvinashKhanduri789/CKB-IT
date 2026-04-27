const AdminPanel = ({ setPageMode, setS }) => {
  function makeQuestions() {
    setPageMode(2);
  }

  function viewResults() {
    setPageMode(3);
    setS(1);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            IT UTSAV
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Code Ke Boss
          </p>
        </div>

        {/* Admin Panel Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-8 pt-8 pb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage competition settings and data
            </p>
          </div>

          {/* Button Container */}
          <div className="px-8 py-8 space-y-4">
            <button
              className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-0.5"
              onClick={makeQuestions}
            >
              Edit Questions
            </button>

            <button
              className="w-full py-4 px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium text-lg rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-0.5"
              onClick={viewResults}
            >
              View Results
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-8 py-4 bg-gray-50">
            <p className="text-center text-xs text-gray-500">
              Authorized access only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;