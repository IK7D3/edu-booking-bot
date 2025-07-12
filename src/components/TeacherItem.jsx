import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../assets/Anim3.json' // مسیر فایل JSON انیمیشن

const TeacherItem = ({ name, title,team, imageUrl, onClick }) => {
  return (
    <li className="cursor-pointer  py-4 sm:pb-4 hover:bg-slate-100 px-1 rounded-md"
    onClick={onClick}>
      <div  className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-500">
          <div className="w-5 h-5">
            <Lottie animationData={animationData} loop autoplay speed={2.5} />
          </div>
        </div>
        <div className="shrink-0">
          <img className="w-14  rounded-xl" src={imageUrl} alt={name} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate dark:text-gray-950">
            {name}
          </p>
          <p className="text-base text-gray-700 truncate dark:text-gray-700">
            {title}
          </p>
          <p className="text-base text-gray-500 truncate dark:text-gray-400">
          {team}
          </p>

        </div>
      </div>
    </li>
  )
}

export default TeacherItem
