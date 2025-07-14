import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherItem from './TeacherItem';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/Glow loading.json'; // این همون لودینگ داشبورد

const Teachers = ({ setSelectedTeacher, setCurrentPage, userTelegramId }) => {
  const [teachersList, setTeachersList] = useState([]);
  const [reservedTeacherIds, setReservedTeacherIds] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(true); // استیت جدید

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoadingTeachers(true); // شروع لودینگ

        const [teachersRes, reservedRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE}/teachers`),
          userTelegramId
            ? axios.get(`${process.env.REACT_APP_API_BASE}/reservations/teachers/${userTelegramId}`)
            : Promise.resolve({ data: [] })
        ]);

        setTeachersList(teachersRes.data);
        setReservedTeacherIds(reservedRes.data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات:", err);
      } finally {
        setLoadingTeachers(false); // پایان لودینگ
      }
    };

    fetchTeachers();
  }, [userTelegramId]);

  const handleTeacherClick = (teacherId) => {
    if (reservedTeacherIds.includes(teacherId)) {
      setShowAlert(true);
      return;
    }
    const selectedTeacher = teachersList.find(t => t.id === teacherId);
    if (selectedTeacher) {
      setSelectedTeacher(selectedTeacher);
      setCurrentPage("reserveTime");
    }
  };


  if (loadingTeachers) {
    return (
      <div className="flex h-60 w-full text-2xl font-bold content-center justify-center items-center text-center text-cyan-600">
        <div className="w-40 h-40">
          <Lottie animationData={loadingAnimation} loop autoplay speed={2.5} />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto font-vazir" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Modal Overlay */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white border-t-4 border-teal-500 rounded-xl text-teal-900 p-6 shadow-md max-w-sm w-full mx-4">
            <div className="flex items-start mb-4">
              <div>
                <p className="font-bold text-lg leading-relaxed">مجاز نیست!</p>
                <p className="text-base">شما قبلاً از این استاد وقت رزرو کرده‌اید.</p>
              </div>
            </div>
            <button
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md w-full"
              onClick={() => setShowAlert(false)}
            >
              باشه
            </button>
          </div>
        </div>
      )}

      <ul className="max-w-md divide-y p-5 pt-0">
        {teachersList.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            name={teacher.name}
            title={teacher.field}
            imageUrl={teacher.avatar_url}
            team={teacher.team}
            onClick={() => handleTeacherClick(teacher.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Teachers;
