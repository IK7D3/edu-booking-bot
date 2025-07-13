import { useEffect, useState } from "react";
import { routes } from "./router";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [userTelegramId, setUserTelegramId] = useState(null);

  useEffect(() => {
    if (currentPage === "welcome") {
      const timer = setTimeout(async () => {
        try {
          const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;
          setUserTelegramId(telegramId);
          const response = await fetch(`${process.env.REACT_APP_API_BASE}/check-user?userTelegramId=${telegramId}`);
          const result = await response.json();

          if (result.registered) {
            setCurrentPage("dashboard");
          } else {
            setCurrentPage("register");
          }
        } catch (error) {
          console.error("خطا در بررسی ثبت‌نام:", error);
          setCurrentPage("register"); // fallback
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const PageComponent = routes[currentPage]?.component;

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {PageComponent && (
        <PageComponent
          setCurrentPage={setCurrentPage}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          userTelegramId={userTelegramId}
        />
      )}
    </div>
  );
}

export default App;
