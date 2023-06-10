import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const nav=useNavigate()
  return (
    <div className=' w-full h-[80vh] flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl sm:text-5xl text-orange-500 mb-10'>Not Found ! </h1>
      <button className='text-xl text-white py-2 px-2 bg-orange-500 rounded hover:font-medium' onClick={()=>nav("/")} > Trang Chủ</button>
    </div>

  )
}
