import React, { FC, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import Calender from '../../Components/Calender/Calender';
import CinemaList from '../../Layout/CinemaList/CinemaList';
import MovieCart from '../../Components/MovieCartList.js/MovieCart/MovieCart';
import FilterMovieDetal from '../../Components/FilterMovieDetal/FilterMovieDetal';
import BannerMovie from './../../Layout/BannerMovie/BannerMovie';
import SkeletonMovieCart from '../../Components/MovieCartList.js/MovieCart/SkeletonMovieCart/SkeletonMovieCart';
import NotFound from './../NotFound/NotFound';

const MovieDetailPage:FC = () => {
    const movieShowing=useSelector((state:RootState)=>state.storeMovieCityCinemaManage.allMovie.movieShowing)
    const availableDates= useSelector((state:RootState)=>state.movieDetailPageManage.availableDates)
    const dateStart= useSelector((state:RootState)=>state.movieDetailPageManage.filter.dateStart)
    const dateFilter= useSelector((state:RootState)=>state.movieDetailPageManage.filter.date)
    const slugMovie=useSelector((state:RootState)=>state.movieDetailPageManage.movie?.slug)
    const idMovie=useSelector((state:RootState)=>state.movieDetailPageManage.movie?.id)
    const statusMovieDetailPage=useSelector((state:RootState)=>state.movieDetailPageManage.statusMovieDetailPage)

    const [navBarDetail, setNavBarDetail] = useState<number>(0);
    const dispatch= useDispatch()
    const {slug}=useParams<{slug?:string}>()
    const nav=useNavigate()
    
    useEffect(()=>{
        if(slug){
            dispatch({
                type:"GET_DATA/MovieInforBySlug",
                payload:slug
            })
        }
    },[slug])

    useEffect(()=>{
        return ()=>{
            dispatch({type:"CANCLE_GET_DATA/MovieCalender"})
            dispatch({type:"SET_DATA/ResetDataMovieDetailPage"})
        }
    },[])
    
    const handleChangeDate=(data:number)=>{
        dispatch({type:"SET_DATA/FilterDate", payload:moment(data).format("DD/MM/YYYY")})
    }
    return (
        <div>

            {
                statusMovieDetailPage?
                <>
                <BannerMovie slugUrl={slug}/>
                <div className='sm:hidden'>
                    {
                        slug==slugMovie ? 
                        <ul className='flex justify-around -translate-y-10'>
                            
                            <li onClick={()=>setNavBarDetail(0)} className={`border-b-4 flex-1 text-lg ${navBarDetail === 0 ? "border-blue-500 text-blue-500 font-extrabold " : "border-zinc-300 font-semibold"} flex justify-center pb-1`}>Lịch chiếu</li>
                            <li onClick={()=>setNavBarDetail(1)} className={`border-b-4 flex-1 text-lg ${navBarDetail === 1 ? "border-blue-500 text-blue-500 font-extrabold " : "border-zinc-300 font-semibold"} flex justify-center pb-1`}>Thông tin</li>
                        </ul>:
                        <ul className='flex justify-around -translate-y-10'>
                            <li className={`flex-1 text-lg rounded-md bg-zinc-300 h-10 mx-3 flex justify-center pb-1`}></li>
                            <li className={`flex-1 text-lg rounded-md bg-zinc-300 h-10 mx-3 flex justify-center pb-1`}></li>
                        </ul>
                    }
                </div>
                {   
                    <>                    
                        <div className='xl:max-w-7xl mx-auto mb-10 sm:mb-0'>
                            <div className='grid grid-cols-12 gap-x-2 xl:gap-x-24 lg:gap-x-14 md:gap-x-7'>
                                <div className='col-span-12 md:col-span-8 '>
                                    <h1 className='text-3xl my-5 font-semibold text-center'>LỊCH CHIẾU</h1>
                                     <div className='xl:max-w-7xl mx-auto rounded shadow-lg py-0 pt-3  z-30 bg-white sticky top-0 '>
                                            <FilterMovieDetal idMovie={idMovie} slugMovie={slugMovie}/>
                                            <Calender 
                                                slugUrl={slug}
                                                slugMovie={slugMovie}
                                                availableDates={availableDates}
                                                dateStart={dateStart}
                                                dateFilter={dateFilter}
                                                onClick={handleChangeDate}
                                            />
                                    </div>
                                     <CinemaList slugUrl={slug} slugMovie={slugMovie}/>
                                </div>  
                               
                                <div className='hidden md:block md:col-span-4 mb-10'>
                                    <h2 className='font-semibold text-center mb-4 text-2xl my-5'>PHIM ĐANG CHIẾU</h2>
                                        {
                                            movieShowing.length===0?
                                            [...Array(6)].map((value, i)=><div className='mb-7' key={i}><SkeletonMovieCart isHome={true}/></div>)
                                            :movieShowing.slice(0, 6).map((movie,i)=><div key={i} className='mb-7'><MovieCart isHome={true} movieCart={movie}/></div>)}
                                    <div>
                                        {
                                            movieShowing.length ? 
                                            <button className='hover:bg-orange-500 hidden md:block rounded-sm hover:text-white border-orange-500 border border-solid
                                                px-2 py-[6px]' type="button"
                                                onClick={()=>nav("/phim-dang-chieu")}
                                            >Xem thêm</button>:
                                            <button className='hidden md:block rounded-sm bg-slate-400 seleton-image w-20 h-9 ' type="button"
                                            ></button>
                                        }
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </>
                }
                </>:<NotFound/>
            }

         </div>
    );
}

export default MovieDetailPage;
