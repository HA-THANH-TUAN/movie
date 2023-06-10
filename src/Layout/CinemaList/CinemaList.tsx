import React, { useState,FC } from 'react';
import { useSelector } from 'react-redux';
import MapCinema from '../../Components/MapCinema/MapCinema';
import { RootState } from '../../redux/store';
import {FaMapMarkerAlt} from "react-icons/fa"
import SessionMovieList from '../../Components/SessionMovieList/SessionMovieList';
import SkeletonCinemaList from './SkeletonCinemaList/SkeletonCinemaList';

interface ICinemaList {
    slugUrl?:string,
    slugMovie: string | undefined
}

const CinemaList:FC<ICinemaList> = ({slugUrl,slugMovie}) => {
    const [dataEmbed, setDataEmbed] = useState({})
    const [popUpMap, setPopUpMap] = useState(false)
    const dateFilter=useSelector((state:RootState)=>state.movieDetailPageManage.filter.date)
    const cinemaFilter=useSelector((state:RootState)=>state.movieDetailPageManage.filter.cinema)
    const cityFilter=useSelector((state:RootState)=>state.movieDetailPageManage.filter.city)
    const cinemaList=useSelector((state:RootState)=>state.movieDetailPageManage.filterResultCalenderMovie)
    const ImageLandscape=useSelector((state:RootState)=>state.movieDetailPageManage.movie.imageLandscape)
    const ImagePortrait=useSelector((state:RootState)=>state.movieDetailPageManage.movie.imagePortrait)
    const filmName=useSelector((state:RootState)=>state.movieDetailPageManage.movie.name)
    const loadingCalender=useSelector((state:RootState)=>state.movieDetailPageManage.loadingCalender)
    
    return (
        <div>

            { 
               loadingCalender?
               <>
                    {Object.keys(dataEmbed).length!=0&&popUpMap&&<MapCinema handleCloseMap={setPopUpMap} dataEmbed={dataEmbed}/>}
                    {cinemaList.length!==0 ? 
                    cinemaList.filter((value)=>value.listDate.includes(dateFilter))
                    .filter((value) => cinemaFilter? value.id===cinemaFilter :true)
                    .filter((value) => cityFilter? value.cityId===cityFilter :true)
                     
                    .map((cinema:any, i)=>
                        <div className='mt-10' key={i}>
                            <div className='mx-3 '>
                                <div className='flex items-center bg-blue-500 py-2 text-white rounded-t-xl '>
                                     <div className=' max-w-[calc(100%)] pl-3'>
                                         <div className='flex items-center mb-3'>
                                            <h2 className='text-xl font-extrabold '>{cinema.name} </h2>
                                            <p className='text-orange-600  text-2xl font-semibold ml-2 cursor-pointer' 
                                            onClick={()=>{
                                                setPopUpMap(true)
                                                setDataEmbed({urlEmbed: cinema.mapEmbeb,cinemaName: cinema.name ,address: cinema.address})}}
                                            ><FaMapMarkerAlt/></p>
                                         </div>
                                         <p className='truncate '><span className='font-semibold'>{cinema.address}</span></p>
                                     </div>
                                
                                </div>
                        
                                <SessionMovieList  
                                    cinemaDates={cinema.dates}
                                    ImageLandscape={ImageLandscape}
                                    ImagePortrait={ImagePortrait}
                                    age={cinema.age}
                                    FilmName={filmName}
                                    cinemaName={cinema.name}
                                    cinemaId={cinema.id}
                                    slugUrl={slugUrl}
                                    dateFilter={dateFilter}
                                />
                            </div>
                        </div>) :<p className='mt-10 text-xl lg:text-3xl text-center'>Chưa có lịch chiếu</p>}
                
                </>:<SkeletonCinemaList/> 
            }
                    
        </div>
    );
}

export default CinemaList;
