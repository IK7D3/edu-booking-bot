import { useEffect, useState } from 'react';
import axios from 'axios';
import animationData from '../../assets/Glow loading.json'
import animationCancel from '../../assets/cancel.json'
import Lottie from 'lottie-react'

export default function TeacherDashboard({ userTelegramId, setCurrentPage }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // مودال حذف
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false); // لودینگ حذف

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE}/teacher-reservations?userTelegramId=${userTelegramId}`
        );
        setList(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [userTelegramId]);

  // باز کردن مودال حذف
  const handleCancel = (rid) => {
    setDeleteId(rid);
    setShowDeleteModal(true);
  };

  // تایید حذف رکورد
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE}/reservations/cancel/${deleteId}`);
      setList((prev) => prev.filter((r) => r.id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (e) {
      console.error(e);
      alert('خطا در حذف رزرو. دوباره تلاش کنید.');
    }
    setDeleting(false);
  };



  if (loading) return <div className=" flex h-full w-full text-2xl font-bold content-center justify-center items-center  text-center text-cyan-600">
    <div className="w-40 h-40">
     <Lottie animationData={animationData} loop autoplay speed={2.5} /></div></div>;

  return (
    <div className="pb-32">
      <h2
        className="text-xl font-bold text-gray-100 mb-5 bg-cyan-800 py-3 pb-4 text-center border-b"
      >
        نوبت‌های دانشجویان
      </h2>

      {list.length === 0 ? (
        <p className="text-gray-600 text-center">نوبتی ثبت نشده است.</p>
      ) : (
        <ul className="space-y-4 px-4">
          {list.map((r) => (
            <li
              key={r.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-row-reverse justify-between items-center gap-4"
            >
              <button
                onClick={() => handleCancel(r.id)}
                className="bg-white hover:bg-red-200 text-white   rounded-full text-base font-semibold"
              >
               <div className="h-20 w-20  bg-blue-`00" >
                    <Lottie animationData={animationCancel}  loop={false} />
                </div> 
                
              </button>

              <div className="flex-grow text-right">
                <p className="font-semibold text-lg text-gray-800">{r.studentName}</p>

                <p className="text-gray-700 text-base mt-1">
                  {`روز ${r.day} | ${r.start_time} – ${r.end_time}`}
                </p>
                <p className="text-gray-700 text-sm ">شماره دانشجویی: {r.stuId}</p>
                <p className="text-gray-700 text-sm">تلفن: {r.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* مودال تایید حذف */}
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
                disabled={deleting}
                className={`px-6 py-2 rounded-md w-full text-white ${
                  deleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deleting ? 'در حال حذف...' : 'حذف کن'}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className={`px-6 py-2 rounded-md w-full text-gray-800 ${
                  deleting ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

    
      <div className="fixed bottom-0 left-0 w-full p-4 border-t bg-white z-50">
        <button
          onClick={() => setCurrentPage('editTimes')}
          className="w-full py-4 bg-cyan-700 text-white rounded-lg hover:bg-gray-700 font-semibold text-lg"
        >
          ویرایش زمانها
        </button>
      </div>
    </div>
  );
}
