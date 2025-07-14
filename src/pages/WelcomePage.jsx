import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Circular Burst.json";

export default function WelcomePage({ onStart }) {
  return (
    <div className="relative font-vazir h-screen bg-cyan-800 overflow-hidden flex flex-col justify-between text-center px-4">
      <div className="relative z-10 flex flex-col items-center justify-center h-[80%] mt-[-5%]">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white inline-block relative">
          <span className="relative inline-block">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="absolute -top-32 -left-20 w-80 h-80 md:w-[22rem] md:h-[22rem] pointer-events-none z-0"
            />
            <span className="relative z-10">استاد</span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 ml-4">
            جو
          </span>
        </h1>

        <p className="mt-6 text-cyan-100 text-lg sm:text-xl md:text-xl font-light leading-relaxed max-w-xl tracking-wide">
          <span className="block text-lg mb-1">هر بار میری دفترش، یا نیست یا شلوغه؟</span>
          <span className="block text-lg text-cyan-200 font-normal">
            با استادجو، نوبتتو از قبل بگیر.
          </span>
        </p>

        <button
          onClick={onStart}
          className="mt-10 px-10 py-4 bg-gradient-to-r from-sky-400 to-emerald-400 text-white text-lg font-semibold rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          شروع کن
        </button>
      </div>

      <div className="text-center text-base text-cyan-100 pb-4">
        استادجو، سامانه رزرو وقت ملاقات با اساتید
      </div>
    </div>
  );
}
