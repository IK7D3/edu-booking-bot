import React, { useState } from 'react';

const getThisWeekDays = () => {
  const days = [];
  const weekdayFormatter = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' });
  const dateFormatter = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' });

  const today = new Date();
  
  for (let i = 0; i < 6; i++) { // حداکثر تا پنجشنبه
    const date = new Date();
    date.setDate(today.getDate() + i);

    const faWeekday = weekdayFormatter.format(date);
    if (faWeekday === 'جمعه') continue; // حذف جمعه

    days.push({
      weekday: faWeekday,
      formattedDate: dateFormatter.format(date),
      date: date.toISOString().split("T")[0],
    });
  }

  return days;
};


  
  

const DayTabs = ({ selectedDate, onSelect }) => {
  const days = getThisWeekDays();

return (
    <div className="overflow-x-auto bg-white pt-5 pb-2 shadow-sm">
  <ul className="flex space-x-2 px-4">
  {days.map((day, index) => {
    const isActive = selectedDate === day.date;
    return (
    <li
      key={day.date}
      className={`flex-shrink-0 ${index === 0 ? 'ml-2' : ''} ${index === days.length -1 ? 'pl-4' : ''}`}
    >

        <button
          onClick={() => onSelect(day.date)}
          className={`
            flex flex-col items-center justify-center
            w-20 h-20
            rounded-lg
            transition
            ${isActive 
              ? 'bg-cyan-600 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          <span className="text-lg font-medium">{day.weekday}</span>
          <span className="text-sm">{day.formattedDate}</span>
        </button>
      </li>
    );
  })}
</ul>

    </div>
  );
};

export default DayTabs;
