import React from 'react';

const ExplainSeat = () => {
    return (
        <ul className='explain-seat flex flex-wrap justify-evenly my-2 sm:my-5 lg:my-8'>
                <li className='flex items-center text-sm sm:text-base md:text-lg font-medium my-3'>
                    <p className='w-5 rounded-[4px] h-5 md:w-6 md:h-6 border-solid border-2 border-zinc-500 md:rounded-md mr-2'></p>
                    <span>Ghế thường</span>
                </li>
                <li className='flex items-center text-sm sm:text-base md:text-lg font-medium my-3'>
                    <p className='w-5 rounded-[4px] h-5 md:w-6 md:h-6 border-solid border-2 border-blue-700 md:rounded-md mr-2'></p>
                    <span>Ghế đôi</span>
                </li>
              
                <li className='flex items-center text-sm sm:text-base md:text-lg font-medium my-3'>
                    <p className='w-5 rounded-[4px] h-5 md:w-6 md:h-6 bg-zinc-400 md:rounded-md mr-2'></p>
                    <span>Ghế đã chọn</span>
                </li>
                <li className='flex items-center text-sm sm:text-base md:text-lg font-medium my-3'>
                    <p className='w-5 rounded-[4px] h-5 md:w-6 md:h-6 bg-orange-600 md:rounded-md mr-2'></p>
                    <span>Ghế đang chọn</span>
                </li>
            </ul>
      
    );
}

export default ExplainSeat;
