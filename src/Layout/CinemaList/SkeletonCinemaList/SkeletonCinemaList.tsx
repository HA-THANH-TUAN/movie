import React from 'react'

export default function SkeletonCinemaList() {
  return (
    <div>
        {[...Array(5)].map((value, i)=>
            <div className='mx-3 my-6' key={i}>
                <div className=' bg-slate-300 py-2 h-16  text-white rounded-t-xl '>
                     <div className=''>
                         <div className='mb-3 pl-4'>
                            <h2 className='seleton-image rounded-md text-xl font-extrabold bg-slate-400 w-10/12 h-5 mb-2'></h2>
                            <p className='seleton-image rounded-md w-7/12 h-5 bg-slate-400 '></p>
                         </div>
                     </div>
                </div>
                <div className='bg-zinc-200 pl-2 py-3'>
                    <h1 className=' seleton-image w-28 h-7 rounded-md bg-slate-400 mb-3'></h1>
                    <ul className='flex flex-wrap'>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                        <li className='seleton-image w-16 h-7 rounded-md bg-slate-400 m-2'></li>
                    </ul>
                </div>
            </div>
        )}
    </div>
  )
}
