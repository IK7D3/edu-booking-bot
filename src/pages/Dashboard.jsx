import React from 'react'

const Dashboard = () => {
  return (
    
    <div class="flex items-center gap-4 p-10">
        <img class="w-10 h-10 rounded-full" 
        src="window.Telegram.WebApp.initDataUnsafe.user.photo_url" alt=""/>
        <div class="font-medium ">
            <div>{window.Telegram?.WebApp.initDataUnsafe.user.username}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{window.Telegram?.WebApp.initDataUnsafe.user.first_name}</div>
        </div>
    </div>

  )
}

export default Dashboard