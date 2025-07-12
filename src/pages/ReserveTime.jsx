import axios from 'axios';
import React, {  useEffect, useState } from "react";
import DayTabs from "../components/DayTabs";
import ShowTime from "../components/ShowTime";
import MyReservations from './MyReservations';

const getWeekdayFromDate = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("fa-IR", { weekday: "long" });
  return formatter.format(date); // مثل "شنبه"
};



const ReserveTime = ({ selectedTeacher, setCurrentPage,userTelegramId }) => {

  
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timesToReserve, setTimesToReserve] = useState([]);
  const [loading, setLoading] = useState(false);

const handleReserve = async (selectedTime) => {
  
  
  try {
    const res = await axios.post('http://localhost:8000/api/reserve', {
      teacher_id: selectedTeacher.id,
      available_time_id: selectedTime.id,
      userTelegramId: String(userTelegramId),
    });

    window.Telegram.WebApp.showAlert("رزرو با موفقیت انجام شد");
    setCurrentPage("dashboard");
  } catch (error) {
    if (error.response?.status === 409) {

      window.Telegram.WebApp.showAlert("این تایم قبلاً رزرو شده است.");
    } else {
  console.error(error.response?.data);
  window.Telegram.WebApp.showAlert(error.response?.data.message || 'خطایی رخ داد');
    }
    console.error("Reservation Error:", error);
  }
};
  // window.Telegram.WebApp.setHeaderColor("#374151"); // یا 'secondary_bg_color'

  useEffect(() => {
    const weekday = getWeekdayFromDate(selectedDate);
    const fetchAvailableTimes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/availableTime`, {
          params: {
            teacher_id: selectedTeacher.id,
            day: weekday,
            is_reserved: 0
          },
        });

        const data = response.data;

        // اگر روز انتخاب‌شده امروز است، فقط تایم‌های آینده را نشان بده
        const now = new Date();
        const isToday = selectedDate === now.toISOString().split("T")[0];

        const filteredTimes = data.filter((item) => {
          if (!isToday) return true;

          // ترکیب تاریخ امروز و ساعت شروع
          const [hour, minute] = item.start_time.split(":");
          const startDateTime = new Date(selectedDate);
          startDateTime.setHours(parseInt(hour), parseInt(minute), 0, 0);

          return startDateTime > now; // فقط تایم‌هایی که از الان بزرگ‌تر هستند
        });

        const formattedTimes = filteredTimes.map((item) => ({
          id: item.id,
          label: `${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`
        }));

        setTimesToReserve(formattedTimes);
      } catch (error) {
        console.error("Error fetching available times:", error);
      }
      setLoading(false);
    };


    fetchAvailableTimes();
  }, [selectedDate, selectedTeacher]);

  return (
    <div className="h-screen pb-24"> {/* فضای پایین برای دکمه بازگشت */}
      
      {/* 👤 مشخصات استاد - بالای صفحه */}
      <div className="w-full bg-white border-b border-gray-200 dark:bg-gray-100 ">
        <div className="flex items-center gap-4 max-w-lg mx-auto font-medium">
          
          <div
            className="inline-flex flex-grow items-center bg-cyan-800 text-white  gap-5
                justify-center px-5 py-2 group "
          >
            <img
              className="w-20 h-20 rounded-xl border-white border-2 shadow-md"
              src={selectedTeacher.avatar_url}
              alt={selectedTeacher.name}
            />

            <div className="font-medium text-lg">
              <div className="font-bold mb-1">{selectedTeacher.name}</div>
              <div className="text-sm text-gray-400 dark:text-gray-300">
                {selectedTeacher.field}
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* 🗓 Tabs تاریخ و لیست تایم‌ها */}
      <DayTabs selectedDate={selectedDate} onSelect={setSelectedDate} />

      <div className="overflow-y-auto mt-4 px-4" style={{ height: "calc(100vh - 260px)" }}>
        {loading ? (
          <div className="text-center text-cyan-700 font-bold animate-pulse mt-10">
            در حال بارگذاری تایم‌ها...
          </div>
        ) : timesToReserve.length === 0 ? (
          <div className="text-center text-red-500 font-semibold mt-10">
            استاد در این روز تایم خالی ندارند.
          </div>
        ) : (
          <ul className=" mx-auto">
            {timesToReserve.map((time) => (
              <ShowTime key={time.id} timeToreserve={time} onReserve={handleReserve} />
            ))}

          </ul>
        )}
      </div>

      {/* 🔙 دکمه بازگشت - پایین صفحه */}
      <div className="fixed flex gap-1  bottom-0 left-0 w-full   p-4 py-7  z-50">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="w-full py-4  bg-cyan-700 text-white rounded-lg  hover:bg-cyan-800 transition-colors font-semibold text-lg"
        >
          بازگشت
        </button>
        <button
          onClick={() => setCurrentPage("myReservations")}
          className="w-full py-4  bg-cyan-700 text-white rounded-lg  hover:bg-cyan-800 transition-colors font-semibold text-lg"
        >
          وقت‌های من
        </button>
      </div>
    </div>
  );
};


export default ReserveTime;
