import React, { useEffect, useState } from 'react';
import MovieCartList from '../../Components/MovieCartList.js/MovieCartList';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {HiArrowNarrowLeft} from "react-icons/hi"
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import { RootState } from '../../redux/store';

const ShowFullFilm:React.FC = () => {
    const nav=useNavigate()
    const allMovie= useSelector((state:RootState)=>state.storeMovieCityCinemaManage.allMovie)
    const {pathname} =useLocation()

    const [listType,setListType]=useState<number>(0)

    const handleChangeTypeList=(data:number)=>{
        setListType(data)
    }

    useEffect(()=>{
        if(pathname=="/phim-dang-chieu"){setListType(0)} else {setListType(1)}
    },[pathname])
    
    
    return (
        <div className='max-w-7xl mx-auto mb-20'>
            <div className='sticky px-2 top-0 z-30 bg-white py-2 md:py-0 md:static'>
                <span onClick={()=>nav("/")} className='md:hidden flex font-semibold justify-center items-center border border-solid hover::bg-orange-500 border-orange-400 mt-5 mb-2 py-1 rounded-md text-blue-500'><span className='text-2xl mr-2'>{<HiArrowNarrowLeft/>}</span>Quay lại</span>
                <nav className='nav-movie font-semibold'>
                    <div className='hidden justify-center mt-10 mb-12 font-bold md:flex nav-tablet'>
                        <NavLink to="/phim-dang-chieu" className={`nav-item-tablet text-3xl pb pt-2 mr-10`}>PHIM ĐANG CHIẾU</NavLink>
                        <NavLink to="/phim-sap-chieu" className={` nav-item-tablet text-3xl pb pt-2`}>PHIM SẮP CHIẾU</NavLink>
                    </div>
                    <div className=' flex mb-3  md:hidden items-center nav-mobile  '>
                        <NavLink to="/phim-dang-chieu" className={`mr-4 py-2 font-medium text-xl text-zinc-500 transition-colors duration-300`}>Đang chiếu</NavLink>
                        <NavLink to="/phim-sap-chieu" className={`py-2 font-medium text-xl text-zinc-500 transition-colors duration-300`}>Sắp chiếu</NavLink>
                    </div>
                </nav>
            </div>
            <div className='mx-2 mt-6'>
                <MovieCartList isHome={false} full={true} movieCartList={listType==0 ? allMovie.movieShowing : allMovie.movieCommingSoon}  />
            </div>
        </div>
    );
}

export default ShowFullFilm;
