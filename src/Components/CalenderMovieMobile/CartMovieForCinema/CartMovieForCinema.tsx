import React, { FC } from 'react'
import { FaRegCalendar } from "react-icons/fa";
import { BsClockHistory } from 'react-icons/bs';
import {AiFillStar} from "react-icons/ai"
import moment from 'moment';
import SessionMovieList from '../../SessionMovieList/SessionMovieList';

interface IPropsCartMovieForCinema{
    dataMovieForCinema:any,
    cinemas:any,
    dateFilter:any,
}

const CartMovieForCinema:FC<IPropsCartMovieForCinema> =({dataMovieForCinema,cinemas,dateFilter})=> {
    return (
    <div >
        <div className='mt-10'>
            {
                dataMovieForCinema.filter((movie:any) => movie.listDate.includes(dateFilter)).map((movie:any, i:number)=>
                <div key={i} className='bg-neutral-150 m-2 mb-20 shadow-xl'>
                    <div className='flex ml-3' > 
                        <img className='w-32 rounded ' src={movie.imagePortrait} alt=""/>
                        <div className=''>
                            <h1 className='text-2xl font-extrabold ml-3'>{movie.name}</h1>
                            <p className='flex flex-wrap items-center'>
                                {movie.age&&movie.age!=0&&<span className={`${movie.age==18?"bg-red-500":movie.age==16?"bg-yellow-500":movie.age==13?"bg-blue-500":"bg-green-600" } ml-3 my-1 text-white font-medium flex justify-center items-center rounded w-12 h-8`}>{`${Number(movie.age)?`C${movie.age}`:`${movie.age.toUpperCase()}`}`}</span>}
                                <span className='ml-3 my-1 flex items-center text-lg font-medium'><BsClockHistory className='mr-1 text-orange-600'/>{movie.duration ? `${movie.duration}  phút`:"0 phút"}</span>
                                <span className='ml-3 my-1 flex items-center text-lg font-medium'><AiFillStar className='mr-1 text-orange-600'/>{movie.point.toFixed(1)}</span>
                                <span className='ml-3 my-1 flex items-center text-lg font-medium'><FaRegCalendar className='mr-1 text-orange-600'/>{moment(movie.startdate).format("DD-MM-YYYY")}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        {
                            <SessionMovieList  
                              cinemaDates={movie.dates}
                              ImageLandscape={movie.imageLandscape}
                              ImagePortrait={movie.ImagePortrait}
                              age={movie.age}
                              FilmName={movie.name}
                              cinemaName={cinemas.name}
                              cinemaId={cinemas.id}
                              slugUrl={movie.slug}
                              dateFilter={dateFilter}
                            />
                        }
                    </div>
                </div>)
            }
        </div>
    </div>
  )
}
export default CartMovieForCinema
