import React, { memo, useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import "./CartDetailMovieMobile.scss"
import {TiMediaPlay} from "react-icons/ti"
import {BiTimeFive} from "react-icons/bi"
import {FaRegCalendar} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import moment from 'moment';
const CartDetailMovieMobile= ({movie,handleOnTrailerPopUp}) => {
    return (
        <div className='cart-detail-movie'>
            <div className=' wraper-image relative'>
                <div className='image absolute z-0'>
                    <img className=' w-full' src={movie.imageLandscape} alt=""/>
                   <div className='flex justify-center items-center absolute top-0 right-0 left-0 bottom-0 z-50'>
                       <p className='flex active:bg-orange-500 p-1 bg-[#000000cc] border-solid opacity-70 hover:opacity-100 border-orange-500 border rounded-lg sm:hidden justify-center items-center'>
                            <span onClick={()=>{handleOnTrailerPopUp()}} className=' text-2xl bg-white p-1 rounded-[50%] flex justify-center items-center'>
                                <TiMediaPlay/>
                            </span>
                        </p>
                   </div>
                    <p className='font-semibold text-white text-xl absolute z-50 left-32 bottom-0 pr-3 pb-1'>{movie.name}</p>
                    
                </div>
                <div className='wraper-mini-image bottom-[-72px] px-5 flex'>
                    <div className='wraper-image-mini flex justify-center -translate-y-2/4 items-center relative'>
                        <img className='h-36 sm:h-44 rounded shadow-md shadow-zinc-400' src={movie.imagePortrait} alt=""/>
                    </div>
                    <div className='content ml-5 '>
                        <p className='flex my-2 '>
                            <span className='text-white flex justify-center items-center mr-4' ><span className='text-orange-500 font-medium'><BiTimeFive/> </span><span className='ml-2 text-zinc-500'>{movie.duration} Phút</span></span>
                            <span className='text-white flex justify-center items-center' ><span className='text-orange-500 font-medium'><AiFillStar/> </span><span className='ml-2 text-zinc-500'>{movie.point?.toFixed(2)}</span></span>
                        </p>
                        <p className='flex items-center '>
                            <span className=' flex justify-center items-center py-1 px-3 leading-none align-middle text-[13px] font-semibold lin rounded text-white bg-orange-500 mr-4' >{movie.age===0 ? movie.age : "P"}</span>
                            <span className='text-white flex justify-center items-center' ><span className='text-orange-500 font-medium'><FaRegCalendar/> </span><span className='ml-2 text-zinc-500'>{moment(movie.startdate).format("DD-MM-YYYY")}</span></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CartDetailMovieMobile);
