import React, { useState } from "react";
import FloatingInput from "../components/FloatingInput";

export default function RegistrationPage({setCurrentPage }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stuId, setStuId] = useState("");
  const [phone, setPhone] = useState("");
 
  
  const handleSubmit = async () => {
    const data = {
      name,
      lastName,
      stuId,
      phone,
      userTelegramId: window.Telegram.WebApp.initDataUnsafe.user.id
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("data: ", data);
        
        const result = await response.json();
    
        if (response.ok) {
            console.log("Success:", result);
            window.Telegram.WebApp.showAlert("اطلاعات با موفقیت ارسال شد!");
            setCurrentPage("dashboard");
        } else {
            if (result.errors) {
                // گرفتن اولین خطا برای نمایش
                const firstError = Object.values(result.errors)[0][0];
                window.Telegram.WebApp.showAlert(firstError);
            } else {
                window.Telegram.WebApp.showAlert("ارسال اطلاعات با خطا مواجه شد.");
            }
            console.error("خطا:", result);
        }
    } catch (error) {
        console.error("Error:", error);
        window.Telegram.WebApp.showAlert("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
    
};

  return (
    <div className="max-w-sm space-y-3 p-3 dir">
        <FloatingInput id="name" label="ناffم" value={name} onChange={(e) => setName(e.target.value)} />
        <FloatingInput id="lastName" label="نام خانوادگی" value={lastName} onChange={(e) => setLastName(e.target.value)} /> 
        <FloatingInput id="stuId" label="شماره دانشجویی" value={stuId} onChange={(e) => setStuId(e.target.value)} /> 
        <FloatingInput id="phone" label="شماره تماس" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button
        type="button"
        onClick={handleSubmit}
        className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
        rounded-lg text-base px-5 py-3 text-center w-full"
      >
        ثبت نام
      </button>
    </div>
  );
}