import React from 'react';
import { SlArrowDown,SlArrowUp } from 'react-icons/sl';
import logo from "../../../assets/images/logo-cinema-1.png"
import "./ItemCinema.scss"
import { useState } from 'react';
import  dateFormat  from 'dateformat';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';

const ItemCinema = (props) => {
    const {address, code , dates, name}=props.dataItemCinema
    const [isDrop, setIsDrop] = useState(false)
    const nav=useNavigate()
    const [isReadMoreShown, setReadMoreShown] = useState(false);
    const handleClick = () => {
        setReadMoreShown(!isReadMoreShown);
    }


    return (
        <div className='item-cinema bg-white overflow-hidden border-solid border-white border rounded-md shadow-xl mb-5'>
            <div className='flex justify-between bg-zinc-300 hover:bg-slate-100 p-3 hover:cursor-pointer' onClick={() => {
                setIsDrop(!isDrop)
            }}>
                <div className="flex">
                    <div className='w-16 md:w-24 mr-5'>
                        <img src={logo} alt="" />
                    </div>
                    <div>
                        <h1 className='flex items-center justify-between text-sm md:text-xl font-medium '>{name}</h1>
                        <div className='md:hidden text-sm '>
                            {isReadMoreShown
                                ? address
                                : address.substring(0, 20)}
                            <button onClick={handleClick}
                                className='md:hidden text-zinc-400 underline decoration-solid text-sm'>{isReadMoreShown ? "Thu gọn" : "...Xem thêm"}
                            </button>
                        </div>
                        <p className='hidden md:block text-sm md:text-lg'>{address}</p>
                    </div>
                </div>
            </div>
            <div className='area-session flex mt-5 p-3 flex-wrap'>
                <div>
                    {dates?.filter((date) => date.showDate==dateFormat(new Date(props.dateStart), "dd/mm/yyyy")).map((inforFilter) =>inforFilter.bundles.map((bundle)=><div className='mb-4'>
                        <h1 className='font-semibold text-zinc-600'>{bundle.version.toUpperCase()} {bundle.caption=="sub" ? "PHỤ ĐỀ":bundle.caption=="voice"?"LỒNG TIẾNG":"" }</h1>
                        {
                            bundle.sessions.map((v,i)=><span key={i} onClick={() => {
                                if(localStorage.getItem("email")&&localStorage.getItem("login")){
                                    nav(`/booking-ticket/${props.dataMovieDetail.slug}?cinemaId=${v.cinemaId}&sessionId=${v.sessionId}`, {
                                        state: {
                                            dayOfWeekLabel: inforFilter.dayOfWeekLabel,
                                            TheaterName: v.screenName,
                                            ShowDate: v.showDate,
                                            ShowTime: v.showTime,
                                            CinemaName: name,
                                            ImageLandscape: props.dataMovieDetail.imageLandscape,
                                            ImagePortrait: props.dataMovieDetail.imagePortrait,
                                            FilmName: props.dataMovieDetail.name,
                                        }
                                    })
                                    
                                }
                                else{

                                }
                                
                            }} className='inline-block mr-2 md:mr-3 border md:border-2 border-blue-400 border-solid px-1 md:px-2 py-1 my-1 md:my-3 cursor-pointer hover:bg-slate-200 rounded-md'><span className='text-sm md:text-lg font-medium'>{v.showTime}</span></span>)
                        }
                    </div>))}
                </div>
            </div>
            
        </div>
    );
}


export default connect(mapStateToProps,mapDispatchToProps)(ItemCinema);



