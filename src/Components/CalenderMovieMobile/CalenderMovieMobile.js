import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImArrowLeft2 } from "react-icons/im";
import CartMovieForCinema from './CartMovieForCinema/CartMovieForCinema';
import Calender from '../Calender/Calender';
import moment  from 'moment';
import Spinner from '../Spinner/Spinner';

const CalenderMovieMobile = ({setProcessMobile,listDate,dataMovieForCinema,dataCinemaChoosed,setDataCinemaChoosed,loading , cinemas, processMobile}) => {
    const [searchParams, setSearchParams]= useSearchParams()
    const [dateFilter,setDateFilter]=useState("")

    const handleGetDate=(data)=>{
      setDateFilter(moment(data).format("DD/MM/YYYY"))
    }
    return (
            <div className='md:hidden'>
            { processMobile==0 ? <ul className='mx-1 mb-10'>
              {cinemas.map((cinema,i)=><li key={i}  onClick={()=>{ setDataCinemaChoosed(cinema); setSearchParams({rap:cinema.slug}); setProcessMobile(1)}} className='my-4'>
                <div className='flex mb-4'>
                    <img className='w-24 h-16 object-cover inline-block shadow-sm rounded-sm shadow-zinc-500' src={`http://cdn.galaxycine.vn${cinema.imageLandscape}`}alt="cinema"/>
                  <div className='ml-4'>
                    <p className='text-lg font-bold'>{cinema.name}</p>
                    <p className='font-bold'>Phone: <span className='font-normal'>{cinema.phone}</span></p>
                  </div>
                </div>
                <hr className='h-1 border-none bg-slate-200'/>
              </li>)}
            </ul>
            :
            <>
              {
                !loading?
                <>
                  <nav className='flex items-center sticky  top-0 py-3 px-2 bg-zinc-200'>
                    <span onClick={()=>{ setDataCinemaChoosed({});setProcessMobile(0)}} className='text-2xl text-blue-500 mr-6'><ImArrowLeft2/></span>
                    <p className='font-semibold text-2xl'>{dataCinemaChoosed.name}</p>
                  </nav>
                  <div className='mx-2'>
                    {
                      listDate.length ? <Calender 
                                          availableDates={listDate}
                                          dateStart={listDate[0]}
                                          dateFilter={dateFilter==""?listDate[0]:dateFilter}
                                          onClick={handleGetDate}
                                        />:undefined
                    }
                  </div>
                  {!listDate.length==0&&!dataMovieForCinema.length==0&&
                  <CartMovieForCinema 
                    listDate={listDate} 
                    dataCinemaChoosed={dataCinemaChoosed} 
                    dataMovieForCinema={dataMovieForCinema} 
                    setDataCinemaChoosed={setDataCinemaChoosed} 
                    setProcessMobile={setProcessMobile} 
                    cinemas={cinemas}
                    dateFilter={dateFilter==""?listDate[0]:dateFilter}
                  />}
                </>:<div className='w-screen h-screen bg-[#000000c5] fixed top-0 right-0 z-[1000] flex justify-center items-center' >
                        <div className="px-7">
                            <Spinner
                             diameter={30}
                             weight={4}
                             color={"#ff7b00"}
                             bg={"inherit"}
                             />
                        </div>
                    </div>
              }
            </>
            }
          </div>
    );
}

export default CalenderMovieMobile;
