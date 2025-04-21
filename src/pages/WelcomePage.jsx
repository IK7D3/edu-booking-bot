import React from 'react';

export default function WelcomePage() {
  return (
    <div
      className=" h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('64.jpg')", // مسیر عکس در پوشه public
      }}
    >
      {/* لایه تیره برای پس‌زمینه */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* محتوای صفحه */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
        <div>
          <h1 className="text-2xl font-bold">خوش آمدید</h1>
          <p className="text-lg mt-2">این یک صفحه خوش امدگویی است.</p>
        </div>
      </div>
    </div>
  );
}