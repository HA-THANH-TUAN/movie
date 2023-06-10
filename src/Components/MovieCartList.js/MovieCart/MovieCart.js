import React from 'react';
import PropTypes from 'prop-types';
import "./MovieCart.scss"
import {AiFillStar} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MovieCart = ({movieCart,isHome}) => {
    const nav=useNavigate()
    const dispatch=useDispatch()
    const {imagePortrait,imageLandscape, age, id , name ,subName , slug}=movieCart
    const handleClickDetailMovie=()=>{
        nav(`/dat-ve/${slug}`); dispatch({type:"SET_DATA/MovieInfor", payload:movieCart})
    }

   
    return (
        <div className='cart-movie cart-image xl:bg-cart-movie-mobile '>
                <div className=''> 
                    <div onClick={handleClickDetailMovie}>
                       <div className=' wraper-image relative hidden md:block cursor-pointer md:rounded w-full lg:rounded-md'>
                            <div className='image overflow-hidden cursor-pointer md:rounded lg:rounded-md '>
                                <img className='w-full img-movie' src={!isHome ? imagePortrait : imageLandscape}  alt=""/>
                                <div className='overlap-cart flex-col invisible absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center cursor-pointer md:rounded w-full lg:rounded-md'>
                                    {age&&age!=0&&<span className={`${age==18?"bg-red-500":age==16?"bg-yellow-500":age==13?"bg-blue-500":"bg-green-600" } mb-5 text-white font-medium flex justify-center items-center rounded w-12 h-7`}>{`${Number(age)?`C${age}`:`${age.toUpperCase()}`}`}</span>}
                                    <button className='border border-orange-500 px-3 py-2 rounded-sm hover:bg-orange-500 text-white bg-[#00000087]' type="button">Mua vé</button>
                                </div>
                            </div>
                       </div>
                       <div className='relative md:hidden rounded' 
                            onClick={handleClickDetailMovie}
                       >
                            <img className='rounded' src={imagePortrait} alt=""/>
                            <div className='absolute bottom-0 right-0 flex pb-3'>
                                <div>
                                    <p className='flex justify-center items-center pr-2  bg-[#00000087] relative mb-2'><span className='text-orange-400 mr-1 ml-3 '><AiFillStar/></span><span className='font-semibold text-white text-lg '>6.4</span></p>
                                    {age&&age!=0&&<span className={`${age==18?"bg-red-500":age==16?"bg-yellow-500":age==13?"bg-blue-500":"bg-green-600" } text-white font-medium flex justify-center items-center rounded w-10 h-6`}>{`${Number(age)?`C${age}`:`${age.toUpperCase()}`}`}</span>}
                                    {/* <span className='inline-block text-white font-semibold px-4 py-0.5 rounded-md bg-orange-500'>16</span> */}
                                </div>
                            </div>
                       </div>
                    </div>
                    <div className='mt-2 pr-2'>
                        <p className='truncate text-lg font-medium font-sans'>{name}</p>
                        <p className='truncate text-base md:block font-medium text-zinc-500'>{subName}</p>
                    </div>
                </div>
        </div>
    );
}

export default MovieCart;
