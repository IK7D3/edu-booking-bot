import Lottie from 'lottie-react'
import React from 'react'
import animationData from "../assets/Anim1.json" // مسیر فایل JSON انیمیشن
import Teachers from '../components/Teachers'

const Dashboard = () => {
  return (
    <>
    <div className="flex items-center gap-1 p-5">
        <div className='w-20 h-20'>
              <Lottie animationData={animationData} loop={true} autoplay={true} speed={2.5} />
            </div>
          <div className="font-medium ">
            <div>ایمان کریمیان</div>
            {/* <div>{window.Telegram?.WebApp.initDataUnsafe.user.username}</div> */}
            <div className="text-sm text-gray-500 dark:text-gray-400">40022313</div>
          </div>
      </div>
<Teachers/>
        {/* <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t 
        border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                <button type="button" className="inline-flex flex-col items-center 
                justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400
                    group-hover:text-blue-600 dark:group-hover:text-blue-500" 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400 
                    group-hover:text-blue-600 dark:group-hover:text-blue-500">صفحه اصلی</span>
                </button>


                <button type="button" className="inline-flex flex-col items-center 
                justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400
                    group-hover:text-blue-600 dark:group-hover:text-blue-500" 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400 
                    group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
                </button>
            </div>
        </div> */}

    
    </>

  )
}

export default Dashboard