import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyReservations = ({ userTelegramId, setCurrentPage }) => {
  const [reservations, setReservations] = useState([]);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    if (userTelegramId) {
      axios.get(`http://localhost:8000/api/reservations/details/${userTelegramId}`)
        .then(res => setReservations(res.data))
        .catch(err => console.error("خطا در دریافت رزروها:", err));
    }
  }, [userTelegramId]);

  const handleDeleteClick = (reservationId) => {
  setSelectedReservationId(reservationId);
  setShowDeleteModal(true);
};

const confirmDelete = () => {
  axios.delete(`http://localhost:8000/api/reservations/${selectedReservationId}`)
    .then(() => {
      setReservations(reservations.filter(r => r.id !== selectedReservationId));
      setShowDeleteModal(false);
      setSelectedReservationId(null);
    })
    .catch(err => {
      console.error("خطا در حذف رزرو:", err);
      setShowDeleteModal(false);
    });
};
// window.Telegram.WebApp.setHeaderColor("#164e63");
  return (
    <>
    {showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
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

    <div className="pb-32  ">
      <h2 className="text-xl font-bold text-gray-100 mb-5 bg-cyan-800  py-3 pb-4 text-center
      border-b">نوبت‌های رزرو شده من</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-600 text-center font-semibold">هیچ نوبتی ثبت نشده است.</p>
      ) : (
        <ul className="space-y-4 px-4">
          {reservations.map((res) => (
            <li key={res.id} className="bg-white border border-gray-200 rounded-xl
             shadow-md p-4 flex justify-between items-center ">
              <div>
                <p className="text-gray-800 font-semibold text-lg">{res.teacher_name}</p>
                <p className="text-gray-600 text-sm mt-1">تاریخ: {res.date}</p>
                <p className="text-gray-600 text-sm">از ساعت {res.start_time} تا {res.end_time}</p>
              </div>
              <button
  onClick={() => handleDeleteClick(res.id)}
  className="bg-red-800 hover:bg-red-600 text-white px-5 py-2  rounded-lg text-base font-semibold transition"
>
  حذف
</button>

            </li>
          ))}
        </ul>
      )}

      {/* 🔙 دکمه بازگشت - پایین صفحه */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 py-7 z-50">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="w-full py-4 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors font-semibold text-lg"
        >
          بازگشت به لیست اساتید
        </button>
      </div>
    </div>
    </>
  );
};

export default MyReservations;
