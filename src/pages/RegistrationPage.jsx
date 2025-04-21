import React from 'react'
import { useState } from "react";
import FloatingInput from "../components/FloatingInput";


export default function RegistrationPage() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
  return (
    <div className="max-w-sm space-y-3 p-3 dir">
      
    
      <FloatingInput id="family" label="نام" value={name} onChange={(e) => setName(e.target.value)}/>
      <FloatingInput id="family" label="نام خانوادگی"  value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <FloatingInput id="family" label="شماره تماس"  value={phone} onChange={(e) => setPhone(e.target.value)}/>
        
      <button type="button" className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 
      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
      rounded-lg text-base px-5 py-3 text-center w-full">ثبت نام</button>


  </div>
  
  )
}
