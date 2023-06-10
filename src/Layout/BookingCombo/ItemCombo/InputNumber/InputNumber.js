import React from 'react';
import {HiPlus,HiMinus} from "react-icons/hi"

const InputNumber = () => {
    return (
        <div className='flex items-center md:justify-center'>
            <span className='cursor-pointer text-xl ml-2'><HiMinus/></span>
            <input className='w-12 font-semibold text-center focus:outline-none mx-2' />
            <span className='cursor-pointer text-xl mr-2'><HiPlus/></span>
        </div>
    );
}

export default (InputNumber);
