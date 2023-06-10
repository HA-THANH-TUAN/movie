import React from 'react'

export default function SkeletonBannerMovie() {
  return (
    <div>
        <div className='sm:hidden'>
            
            <div className='cart-detail-movie'>
                <div className=' relative'>
                    <div className='seleton-image w-full pt-[66.67%] relative bg-zinc-400'>
                    </div>
                    <div className='bottom-[-72px] px-5 flex'>
                        <div className='flex justify-center -translate-y-2/4 w-24 seleton-image pt-[calc(6rem*3/2)] bg-zinc-300 rounded-sm items-center relative'>
                        </div>
                        <div className='content ml-5 '>
                            <p className='flex my-2 '>
                                <span className='seleton-image w-20 h-4 rounded bg-zinc-300 mr-4' ></span>
                                <span className='seleton-image w-20 h-4 rounded bg-zinc-300' ></span>
                            </p>
                            <p className='flex items-center '>
                                <span className='seleton-image w-20 h-4 bg-zinc-300 py-1 px-3 rounded mr-4' ></span>
                                <span className='seleton-image w-20 h-4 bg-zinc-300 rounded' ></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mb-20 hidden md:block'>
            <div className='w-full seleton-image bg-zinc-300 pt-[43%]'>
                <div className='absolute top-0 right-0 left-0 bottom-0 '>
                    <div className='max-w-7xl mx-auto flex items-center mt-[10%]'>
                        <div className='w-[150px] bg-zinc-400 rounded-sm pt-[235px]'>

                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    </div>
  )
}
