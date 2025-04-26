import Lottie from 'lottie-react'
import React from 'react'
import animationData from "../assets/Anim1.json" // مسیر فایل JSON انیمیشن
import Teachers from '../components/Teachers'

const Dashboard = () => {
  return (
    <>

      <Teachers/>
        <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white border-t 
        border-gray-200 dark:bg-gray-100 ">
              <div className="grid h-full max-w-lg  mx-auto font-medium">
                <div type="button" className="inline-flex flex-grow items-center text-gray-700 
                justify-center px-5 hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <div className='w-20 h-20 '>
              <Lottie animationData={animationData} loop={true} autoplay={true} speed={2.5} />
            </div>
            <div className="font-medium text-sm ">
            <div className='font-bold '>ایمان کریمیان</div>
            {/* <div>{window.Telegram?.WebApp.initDataUnsafe.user.username}</div> */}
            <div className="text-sm text-gray-500 dark:text-gray-400">40022313</div>
          </div>
                </div>


          
            </div>
        </div>

    
    </>

  )
}

export default Dashboard