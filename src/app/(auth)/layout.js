"use client";
import { useEffect } from "react";
import React from 'react'
//import { checkUser } from "@/lib/checkUser";

const AuthLayout = ({children}) => {
  /*useEffect(() => {
    console.log("🔄 Running checkUser() on page load...");
    checkUser(); 
  }, []);*/
  return (
    <div className='flex justify-center pt-40'>
      {children}
    </div>
  )
}

export default AuthLayout
