import React from 'react';
import InputNumber from './InputNumber/InputNumber';
import {HiPlus,HiMinus} from "react-icons/hi"
import { connect, useDispatch } from 'react-redux';

const ItemCombo = (props) => {
    const {imageUrl, id,description,extendedDescription, displayPrice,number }=props.dataItemCombo
    const dispatch= useDispatch()

    return (
        <div className='item-combo bg-orange p-2 md:bg-zinc-300 bg-white md:flex md:mt-2 sm:mt-8 mt-5 mx-auto sm:mx-16 md:mx-auto  rounded-md md:rounded-none'>
            <div className='md:basis-2/12 xl:basis-2/12'>
                <img className='rounded-md' src={imageUrl} alt="combo"/>
            </div>
            <div className='md:ml-3 md:basis-6/12 xl:basis-5/12'>
                <p className='font-bold mt-2 md:m-0'>{description}</p>
                <p className='text-[13px] font-semibold text-zinc-500'>{extendedDescription}</p>
                <p className='mt-2 md:m-0 font-bold'>Giá: {String(displayPrice).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}  đ</p>
            </div>
            <div className='flex md:basis-4/12 xl:basis-5/12 md:text-center items-center mt-4 md:m-0 md:ml-3 justify-between'>
                <div className='basis-6/12 md:order-1 order-2 md:justify-center'>
                    <div className='flex items-center md:justify-center'>
                        <span style={{borderRadius:"50%"}} className={`cursor-pointer text-lg ml-2 inline-block hover:text-white hover:bg-orange-500 p-1 ${number? "bg-blue-600":"pointer-events-none  bg-zinc-500"}`} onClick={()=>dispatch({type:"SET_DATA/comboIncrease", payload:id})}><HiMinus/></span>
                        <span className='w-12 font-semibold text-center focus:outline-none rounded mx-2 text-lg  bg-slate-300 md:bg-white' >{number}</span>
                        <span style={{borderRadius:"50%"}} className='cursor-pointer text-lg mr-2 inline-block hover:text-white hover:bg-orange-500 bg-blue-600 p-1' onClick={()=>dispatch({type:"SET_DATA/comboDecrease", payload:id})}><HiPlus/></span>
                    </div>
                </div>
                <span className='text-xl font-bold basis-6/12 md:order-2 order-1'> {String(number*displayPrice).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} <span className=''>đ</span> </span>
            </div>
        </div>
 
    );
}


export default ItemCombo;

