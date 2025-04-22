// src/App.js
import { useEffect, useState } from "react";
import { routes } from "./router";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");

  useEffect(() => {
    // اتوماتیک بعد 3 ثانیه از welcome بره به register
    if (currentPage === "welcome") {
      const timer = setTimeout(() => {
        setCurrentPage("register");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const PageComponent = routes[currentPage]?.component;

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {PageComponent && <PageComponent setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;
