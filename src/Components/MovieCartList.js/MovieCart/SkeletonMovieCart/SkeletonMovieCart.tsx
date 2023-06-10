import React from 'react'

interface IPropsSkeletonMovieCart {
    isHome:boolean
}

const SkeletonMovieCart:React.FC<IPropsSkeletonMovieCart>=({isHome})=> {
  return (
        <div className={`col-span-6 sm:col-span-4 md:col-span-4 rounded-md bg-slate-300 ${isHome ? "lg:col-span-4" : "lg:col-span-3"}`}>
            <div className=''>
                <div className='rounded-t-md bg-slate-400 seleton-image'>
                    <div className={`opacity-0 hidden md:inline-block relative ${!isHome ? "pt-[150%]" : "pt-[75%]" }`}>
                        <p className='absolute w-full h-full seleton-image bg-black'></p>
                    </div>
                    <div className={`opacity-0  md:hidden relative pt-[150%]`}>
                        <p className='absolute w-full h-full seleton-image bg-black'></p>
                    </div>
                </div>
                <div className='mt-3 pl-2 pb-2'>
                    <p className='seleton-image bg-slate-400 rounded-md w-10/12 h-4 mb-2'></p>
                    <p className='seleton-image bg-slate-400 rounded-md w-10/12 h-4'></p>
                </div>
            </div>
        </div>
  )
}
export default SkeletonMovieCart