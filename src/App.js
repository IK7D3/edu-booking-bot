import RegistrationPage from "./pages/RegistrationPage";
import WelcomePage from "./pages/WelcomePage";
import { useState, useEffect } from "react";

function App() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // شروع انیمیشن محو شدن
    }, 3000); // نمایش صفحه ولکام برای 3 ثانیه

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* صفحه Welcome */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <WelcomePage />
      </div>

      {/* صفحه Registration */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          fadeOut ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <RegistrationPage />
      </div>
    </div>
  );
}

export default App;