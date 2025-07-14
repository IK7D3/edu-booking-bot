// src/pages/Teachers/EditTimes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import animationData from '../../assets/Glow loading.json'
import Lottie from 'lottie-react'
import animationDelete from '../../assets/Trash Can.json'
import animationEdite from '../../assets/Edit Note animation.json'

const DAYS = ["شنبه","یک‌شنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه"];

export default function EditTimes({ setCurrentPage, userTelegramId }) {
  /* ───────── state ها ───────── */
  const [teacherId,setTeacherId]     = useState(null);
  const [slots,setSlots]             = useState({});      // {day: [slot,…]}
  const [loading,setLoading]         = useState(true);

  const [editSlot,setEditSlot]       = useState(null);    // {id,day,start,end}
  const [saving,setSaving]           = useState(false);

  const [newDay,setNewDay]           = useState(null);    // روزی که می‌خواهیم اسلات تازه اضافه کنیم
  const [newStart,setNewStart]       = useState("08:00");
  const [newEnd,setNewEnd]           = useState("09:00");

  const [delSlot,setDelSlot]         = useState(null);    // {id,day}
  const [deleting,setDeleting]       = useState(false);

  /* ───────── گرفتن teacher_id و اسلات‌ها ───────── */
  useEffect(()=>{ (async () => {
      try{
        const {data:resv}=await axios.get(`${process.env.REACT_APP_API_BASE}/teacher-reservations?userTelegramId=${userTelegramId}`);
        let tid = resv.length ? resv[0].teacher_id : null;
        if(!tid){
          const {data:tData}=await axios.get(`${process.env.REACT_APP_API_BASE}/teachers?userTelegramId=${userTelegramId}`);
          if(tData.length) tid=tData[0].id;
        }
        if(!tid){ alert("استاد پیدا نشد"); return; }
        setTeacherId(tid);

        const {data:sData}=await axios.get(`${process.env.REACT_APP_API_BASE}/teacher/available-times?teacher_id=${tid}`);
        setSlots(sData);                    // ممکن است برخی روزها وجود نداشته باشند
      }catch(e){ console.error(e); alert("خطا در واکشی داده‌ها"); }
      finally{ setLoading(false); }
  })(); },[userTelegramId]);

  /* ───────── کمک‌تابع‌ها ───────── */
  const format = (t)=> (t.length===5 ? `${t}:00` : t);   // HH:mm → HH:mm:ss
  const refreshSlot = (day,id,updater)=> setSlots(prev=>{
    const clone={...prev};
    clone[day]=clone[day].map(s=>s.id===id? updater(s):s);
    return clone;
  });

  /* ───────── ذخیره ویرایش ───────── */
  const saveEdit = async ()=>{
    if(!editSlot) return;
    setSaving(true);
    try{
      await axios.put(`${process.env.REACT_APP_API_BASE}/available-times/${editSlot.id}`,{
        start_time:format(editSlot.start), end_time:format(editSlot.end)
      });
      refreshSlot(editSlot.day,editSlot.id,s=>({
        ...s,
        start_time:format(editSlot.start),
        end_time  :format(editSlot.end)
      }));
      setEditSlot(null);
    }catch(e){ alert(e.response?.data?.message||"خطا در ذخیره"); }
    finally{ setSaving(false); }
  };

  /* ───────── افزودن اسلات ───────── */
  const addSlot = async ()=>{
    setSaving(true);
    try{
      const {data:newSlot}=await axios.post(`${process.env.REACT_APP_API_BASE}/available-times`,{
        teacher_id:teacherId, day:newDay,
        start_time:format(newStart), end_time:format(newEnd)
      });
      setSlots(prev=>{
        const clone={...prev};
        clone[newDay]=[...(clone[newDay]||[]),newSlot];
        return clone;
      });
      setNewDay(null);
    }catch(e){ alert(e.response?.data?.message||"خطا در افزودن"); }
    finally{ setSaving(false); }
  };

  /* ───────── حذف اسلات ───────── */
  const confirmDelete = async ()=>{
    if(!delSlot) return;
    setDeleting(true);
    try{
      await axios.delete(`${process.env.REACT_APP_API_BASE}/available-times/${delSlot.id}`);
      setSlots(prev=>{
        const clone={...prev};
        clone[delSlot.day]=clone[delSlot.day].filter(s=>s.id!==delSlot.id);
        return clone;
      });
      setDelSlot(null);
    }catch(e){ alert(e.response?.data?.message||"خطا در حذف"); }
    finally{ setDeleting(false); }
  };

  /* ───────── UI ───────── */
  if(loading) return <div className=" flex h-full w-full text-2xl font-bold content-center justify-center items-center  text-center text-cyan-600">
    <div className="w-40 h-40">
     <Lottie animationData={animationData} loop autoplay  speed={2.5} /></div></div>

//   <p className="h-full w-full text-2xl font-bold content-center  p-6 text-center text-cyan-600">در حال بارگذاری…</p>;

  return(
  <div className="h-full flex flex-col">
    <h2 className="text-xl font-bold text-gray-100 mb-1 bg-cyan-800 py-3 pb-4 text-center border-b"
        >
        مدیریت زمان‌های حضور
      </h2>
    {/* بخش قابل اسکرول */}
    <div className="flex-1 overflow-y-auto  pb-20">
      

      {DAYS.map(day=>(
        <div key={day} className="mb-6 p-7">
          {/* سرتیتر روز + دکمه افزودن */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{day}</h3>
            <button
              onClick={()=>{setNewDay(day); setNewStart("08:00"); setNewEnd("09:00");}}
              className="text-base ml-2 text-cyan-700 hover:underline"
            >
              + افزودن تایم
            </button>
          </div>

          {!(slots[day]?.length) ? (
            <p className="text-gray-500 text-base">تایمی برای این روز ثبت نشده است.</p>
          ):(
            <div className="space-y-2">
              {slots[day].map(s=>(
                <div key={s.id} className="flex justify-between items-center px-6 py-1 border rounded-full">
                  <span className="text-lg font-base">
                    {s.start_time?.slice(0, 5)} – {s.end_time?.slice(0, 5)}
                    {s.is_reserved === 1 && (
                        <span className="mr-2 text-red-500 text-sm">(رزرو شده)</span>
                    )}
                    </span>

                  <div className="flex gap-2">
  <button
    disabled={s.is_reserved === 1}
    onClick={() =>
      setEditSlot({
        id: s.id,
        day,
        start: s.start_time.slice(0, 5),
        end: s.end_time.slice(0, 5),
      })
    }
    className={`rounded-lg text-white text-base ${
      s.is_reserved ? "cursor-not-allowed" : ""
    }`}
  >
    <div className="h-12 w-12">
      <Lottie
        animationData={animationEdite}
        loop={false}             
        autoplay={true}          
        initialSegment={[0, 30]} 
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  </button>

                    <button
                      disabled={s.is_reserved===1}
                      onClick={()=>setDelSlot({id:s.id,day})}
                      className={` rounded text-white text-base ${
                        s.is_reserved? " cursor-not-allowed"
                                      : " hover:"
                      }`}
                    >
                        <div className="h-12 w-12  " >
                            <Lottie animationData={animationDelete}  loop={false} 
                            style={{ width: "80%", height: "80%" }} />
                        </div>   
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* دکمه ثابت پایین */}
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t z-50">
      <button
        onClick={()=>setCurrentPage("teacherDash")}
        className="w-full py-4 bg-cyan-700 text-white rounded-lg hover:bg-gray-700 font-semibold text-lg"
      >
        بازگشت
      </button>
    </div>

    {/* ───── مودال‌های سه‌گانه (افزودن، ویرایش، حذف) ───── */}

    {/* ▸ مودال افزودن */}
    {newDay && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
        <div className="bg-white rounded-xl w-5/6 max-w-sm p-6 space-y-4">
          <h4 className="font-bold text-lg text-center">افزودن تایم به {newDay}</h4>
          <label className="block text-base">
            شروع:
            <input type="time" value={newStart}
              onChange={e=>setNewStart(e.target.value)}
              className="mt-1 w-full border p-2 rounded"/>
          </label>
          <label className="block text-base">
            پایان:
            <input type="time" value={newEnd}
              onChange={e=>setNewEnd(e.target.value)}
              className="mt-1 w-full border p-2 rounded"/>
          </label>
          <div className="flex gap-2">
            <button onClick={addSlot} disabled={saving}
              className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded">
              {saving? "در حال ذخیره…" : "ذخیره"}
            </button>
            <button onClick={()=>setNewDay(null)} disabled={saving}
              className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded">
              لغو
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ▸ مودال ویرایش */}
    {editSlot && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
        <div className="bg-white rounded-xl w-5/6 max-w-sm p-6 space-y-4">
          <h4 className="font-bold text-xl text-center">ویرایش تایم</h4>
          <label className="block text-base">
            شروع:
            <input type="time" value={editSlot.start}
              onChange={e=>setEditSlot({...editSlot,start:e.target.value})}
              className="mt-1 w-full border p-2 rounded"/>
          </label>
          <label className="block text-base">
            پایان:
            <input type="time" value={editSlot.end}
              onChange={e=>setEditSlot({...editSlot,end:e.target.value})}
              className="mt-1 w-full border p-2 rounded"/>
          </label>
          <div className="flex gap-2">
            <button onClick={saveEdit} disabled={saving}
              className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded">
              {saving? "در حال ذخیره…" : "ذخیره"}
            </button>
            <button onClick={()=>setEditSlot(null)} disabled={saving}
              className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded">
              لغو
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ▸ مودال حذف (همان استایل درخواستی) */}
    {delSlot && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
        <div className="bg-white border-t-4 border-red-500 rounded-xl text-red-900 p-6 shadow-md max-w-sm w-full mx-4">
          <div className="flex items-start mb-4">
            <div>
              <p className="font-bold text-lg leading-relaxed">حذف تایم</p>
              <p className="text-base">آیا از حذف این تایم مطمئن هستید؟</p>
            </div>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <button onClick={confirmDelete} disabled={deleting}
              className={`px-6 py-2 rounded-md w-full text-white ${
                deleting?'bg-red-400 cursor-not-allowed':'bg-red-600 hover:bg-red-700'
              }`}>
              {deleting?"در حال حذف…":"حذف کن"}
            </button>
            <button onClick={()=>setDelSlot(null)} disabled={deleting}
              className={`px-6 py-2 rounded-md w-full text-gray-800 ${
                deleting?'bg-gray-200 cursor-not-allowed':'bg-gray-300 hover:bg-gray-400'
              }`}>
              لغو
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
