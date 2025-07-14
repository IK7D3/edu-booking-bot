import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationDelete from '../assets/delete.json';
import animationLoading from '../assets/Glow loading.json'; // ⬅️ لودینگ

const MyReservations = ({ userTelegramId, setCurrentPage }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ استیت جدید لودینگ
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    if (userTelegramId) {
      setLoading(true); // شروع لودینگ
      axios
        .get(`${process.env.REACT_APP_API_BASE}/reservations/details/${userTelegramId}`)
        .then((res) => setReservations(res.data))
        .catch((err) => console.error("خطا در دریافت رزروها:", err))
        .finally(() => setLoading(false)); // پایان لودینگ
    }
  }, [userTelegramId]);

  const handleDeleteClick = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE}/reservations/${selectedReservationId}`)
      .then(() => {
        setReservations(reservations.filter((r) => r.id !== selectedReservationId));
        setShowDeleteModal(false);
        setSelectedReservationId(null);
      })
      .catch((err) => {
        console.error("خطا در حذف رزرو:", err);
        setShowDeleteModal(false);
      });
  };

  return (
    <>
      {/* مودال حذف */}
      {showDeleteModal && (
        <div className="fixed font-vazir inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white border-t-4 border-red-500 rounded-xl text-red-900 p-6 shadow-md max-w-sm w-full mx-4">
            <div className="flex items-start mb-4">
              <div>
                <p className="font-bold text-lg leading-relaxed">حذف رزرو</p>
                <p className="text-base">آیا از حذف این رزرو مطمئن هستید؟</p>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md w-full"
              >
                حذف کن
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md w-full"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pb-32">
        <h2 className="text-xl font-bold text-gray-100 mb-5 bg-cyan-800 py-3 pb-4 text-center border-b">
          نوبت‌های رزرو شده من
        </h2>

        {loading ? (
          // ⬅️ لودینگ وقتی در حال دریافت داده‌ایم
          <div className="flex  justify-center items-center h-60 text-cyan-600">
            <div className="w-40 h-40">
              <Lottie animationData={animationLoading} loop autoplay speed={2.5} />
            </div>
          </div>
        ) : reservations.length === 0 ? (
          // ⬅️ فقط وقتی دیتا اومده و خالیه
          <p className="text-gray-600 pt-5 text-base text-center font-semibold">
            هیچ نوبتی ثبت نشده است.
          </p>
        ) : (
          <ul className="space-y-4 px-4">
            {reservations.map((res) => (
              <li
                key={res.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800 font-semibold text-lg">{res.teacher_name}</p>
                  <p className="text-gray-700 text-base mt-1">روز: {res.day}</p>
                  <p className="text-gray-700 text-base mt-1">تاریخ: {res.date}</p>
                  <p className="text-gray-700 text-base mt-1">
                    از ساعت {res.start_time} تا {res.end_time}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteClick(res.id)}
                  className="rounded-full hover:bg-red-50 ml-2 text-base font-semibold transition"
                >
                  <div className="h-20 w-20">
                    <Lottie animationData={animationDelete} loop={true} style={{ width: '100%', height: '100%' }} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* دکمه بازگشت */}
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 py-7 z-50">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="w-full py-4 font-vazir bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors font-semibold text-lg"
          >
            بازگشت به لیست اساتید
          </button>
        </div>
      </div>
    </>
  );
};

export default MyReservations;
