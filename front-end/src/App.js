import { useState } from "react";
import { routes } from "./router";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [userTelegramId, setUserTelegramId] = useState(null);

  // تابع برای شروع و رفتن به صفحه بعدی
  const handleStart = async () => {
    try {
      const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;
      setUserTelegramId(telegramId);

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE}/check-user?userTelegramId=${telegramId}`
      );
      const { registered, role } = await res.json();

      if (!registered) {
        setCurrentPage("register");
      } else {
        if (role === "teacher") {
          setCurrentPage("teacherDash");
        } else {
          setCurrentPage("dashboard");
        }
      }
    } catch (e) {
      console.error("check-user error:", e);
      setCurrentPage("register");
    }
  };

  const PageComponent = routes[currentPage]?.component;

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {currentPage === "welcome" ? (
        <WelcomePage setCurrentPage={setCurrentPage} onStart={handleStart} />
      ) : (
        PageComponent && (
          <PageComponent
            setCurrentPage={setCurrentPage}
            selectedTeacher={selectedTeacher}
            setSelectedTeacher={setSelectedTeacher}
            userTelegramId={userTelegramId}
          />
        )
      )}
    </div>
  );
}

export default App;
