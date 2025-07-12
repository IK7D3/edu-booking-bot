import Teachers from '../components/Teachers';

const Dashboard = ({ setSelectedTeacher, setCurrentPage, userTelegramId }) => {
  return (
    <>
    <h2 className="text-xl font-bold text-gray-100 mb-2 bg-cyan-800 pb-4  p-3 text-center
      border-b">اساتید</h2>
      <Teachers
        setSelectedTeacher={setSelectedTeacher}
        setCurrentPage={setCurrentPage}
        userTelegramId={userTelegramId}
      />     

      {/* 🔘 دکمه مشاهده وقت‌های من */}
      <div className="fixed bottom-0 left-0 w-full p-4 py-7  z-40">
        <button
          onClick={() => setCurrentPage("myReservations")}
          className="w-full py-4 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors font-semibold text-lg"
        >
          مشاهده وقت‌های من
        </button>
      </div>
    </>
  );
};

export default Dashboard;
