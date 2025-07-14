import Lottie from 'lottie-react'
import React from 'react'
import animationData from '../assets/AnimTimer.json'
const ShowTime = ({ timeToreserve, onReserve }) => {
  return (
    <li className="py-3 mx-auto bg-white border border-gray-700 px-4 rounded-xl mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="w-6 h-6">
            <Lottie animationData={animationData} loop autoplay speed={2.5} />
          </div>
          <p className="text-lg font-medium text-gray-900 truncate dark:text-gray-950">
            {timeToreserve.label}
          </p>
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none
          focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2 pb-3
          text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 leading-none"
          onClick={() => onReserve(timeToreserve)}
        >
          رزرو
        </button>
      </div>
    </li>
  );
};




export default ShowTime