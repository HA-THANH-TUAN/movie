import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './../Spinner/Spinner';
import { useDispatch } from 'react-redux';

const CalenderMovie = ({cinemas,setDataCinemaChoosed,loading,setProcessMobile, dataMovieForCinema , dataCinemaChoosed}) => {
    const [dataSessionDates, setDataSessionDates] = useState([])
    const nav=useNavigate()
    const dispatch= useDispatch()
    const [filmChoose, setfilmChoose]=useState({})
    return (
        <div className='hidden md:block mt-10'>
          <section className='grid grid-cols-12 gap-x-5 '>
            <div className='col-span-4'>
              <div className=''>
                <h1 className='bg-orange-500 text-center font-extrabold text-xl text-white py-2'>CHỌN PHIM</h1>
                <ul className='border-solid border-[1px] border-zinc-300 [&>*:nth-child(n)]:border-t [&>*:nth-child(n)]:border-solid [&>*:nth-child(n)]:border-zinc-300'>
                  {cinemas.map(cinema=><li key={cinema.id}
                  className={` ${cinema.code==dataCinemaChoosed?.code ? "bg-slate-300 pointer-events-none": "bg-white"} hover:bg-slate-300 cursor-pointer p-2`}
                  onClick={()=>{setDataCinemaChoosed(cinema) ;setfilmChoose({});setProcessMobile(1); setDataSessionDates([])}}
                  >
                      <h2 className='py-2 text-lg font-semibold'>{cinema.name.toUpperCase()}</h2>
                  </li>)}
                </ul>
              </div>
              
            </div>
            <div className='col-span-4'>
              <div className='bg-white'>
                <h1 className='bg-orange-500 text-center font-extrabold text-xl text-white py-2'>CHỌN PHIM</h1>
                {loading? 
                <>
                    <div className='w-screen h-screen bg-[#0000009a] fixed top-0 right-0 z-[1000] flex justify-center items-center' >
                            <div className="px-7">
                                   <Spinner
                                    diameter={30}
                                    weight={4}
                                    color={"#ff7b00"}
                                    bg={"inherit"}
                                    />
                        </div>
                    </div>
                </>
                :
                <ul className=' border-zinc-300 border-solid border [&>*:nth-child(n)]:border-t [&>*:nth-child(n)]:border-solid [&>*:nth-child(n)]:border-zinc-300'>
                  {dataMovieForCinema.length==0?<li className='py-2 pl-2 font-medium'>Hãy chọn rạp .</li>:undefined}
                  {dataMovieForCinema.map(inforMovie=><li
                  key={inforMovie.id}
                  onClick={()=>{setDataSessionDates(inforMovie.dates); setfilmChoose(inforMovie)}}
                  className={`${inforMovie.id ===filmChoose.id ? "bg-slate-300 pointer-events-none" : "bg-white"} hover:bg-slate-300 cursor-pointer p-2`}
                  >{<div className='flex md:justify-center lg:justify-start'>
                      <div className="flex md:flex-col lg:flex-row lg:justify-between md:items-center flex-1 ">
                        <div className='xl:w-24 md:w-32 flex-none md:mb-5 lg:mb-0'>
                          <img className='rounded-sm' src={inforMovie.imageLandscape} alt=""/>
                        </div>
                        <div className='flex justify-between items-start md:w-full lg:flex-1 lg:w-auto'>
                            <h2 className='mx-3 font-medium  '>{inforMovie.movieName.toUpperCase()}</h2>
                            {inforMovie.age&&inforMovie.age!=0&&<span className={`${inforMovie.age==18?"bg-red-500":inforMovie.age==16?"bg-yellow-500":inforMovie.age==13?"bg-blue-500":"bg-green-600" } ml-3 my-1 text-white font-medium flex justify-center items-center rounded py-1 px-2`}>{`${Number(inforMovie.age)?`C${inforMovie.age}`:`${inforMovie.age.toUpperCase()}`}`}</span>}
                        </div>
                      </div>
                  </div>}</li>)}
                </ul>
                }
              </div>
              
            </div>
            <div className='col-span-4'>
              <div className=''>
                <h1 className='bg-orange-500 text-center font-extrabold text-xl text-white py-2'>CHỌN SUẤT</h1>
                <ul className='border-zinc-300 border-solid border [&>*:nth-child(n)]:border-t [&>*:nth-child(n)]:border-solid [&>*:nth-child(n)]:border-zinc-300'>
                  {
                    dataSessionDates.length==0 ?<li className='pl-3 py-2 font-medium'>Bạn hãy chọn phim .</li>:
                    <>{dataSessionDates.map((date, i)=><li key={i} className='pl-3 py-3'><div>
                      <h1 className='text-lg font-bold mt-2 mb-3 '>{date.dayOfWeekLabel}, {date.showDate}</h1>
                      <section>
                        {date.bundles.map((bundle,i)=><div key={i}>
                          <h3 className='text-lg font-bold'>{bundle.version} - {bundle.caption=="sub" ? "Lồng tiếng" : bundle.caption=="voice"?"Thuyết minh":undefined }</h3>
                          <ul className='flex flex-wrap '>
                            {bundle.sessions.map((session,i)=><li 
                            key={i}
                            onClick={()=>{
                              nav(`/booking-ticket/${filmChoose.slug}?id=${dataCinemaChoosed.id}&cimenaId=${session.cinemaId}&sessionId=${session.sessionId}`)
                              dispatch({
                                type:"SET_DATA/inforMovieBooking",
                                payload: {
                                   age: filmChoose.age,
                                   ShowCode:`${session.cinemaId}-${session.sessionId}`,
                                   dayOfWeekLabel:session.dayOfWeekLabel,
                                   CinemaName: dataCinemaChoosed.name,
                                   TheaterName: session.screenName,
                                   FilmName: filmChoose.name,
                                   ImageLandscape: filmChoose.imageLandscape,
                                   ImagePortrait: filmChoose.imagePortrait,
                                   ShowTime: session.showTime,
                                   ShowDate:session.showDate,
                               }
                            })
                            }}
                            className='bg-zinc-400 transition-colors cursor-pointer hover:bg-orange-500 mx-2 font-bold rounded-2xl px-5 py-1 my-2'>{session.showTime}</li>)}
                          </ul>
                        </div>)}
                      </section>
                    </div></li>)}</>
                  }
                </ul>
              </div>
            </div>
          </section>
        </div>
    );
}

export default CalenderMovie;
