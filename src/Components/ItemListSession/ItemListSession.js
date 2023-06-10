import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ItemListSession = ({ valueTime,valueCinemaAndMovie, actionModalLogin }) => {
    const { showDate, dayOfWeekLabel, bundles} = valueTime
    const nav=useNavigate()
    // console.log("bundles[0].sessions", bundles[0].sessions.map((s) => s.showTime))
    return (
        <div className='item-list-sesion border-b border-r border-l border-solid border-zinc-300'>
                <div className='ml-3 my-2 text-xl text-zinc-500 text-center flex'>
                    <p className='font-semibold mr-1'>{dayOfWeekLabel},</p>
                    <p className='font-medium'>{showDate}</p>
                </div>

            <div className=' p-2 pt-5'>
                {bundles.map((bundle ,i)=>
                <div>
                        <p className='text-md font-medium'>
                            <span className='uppercase mx-2'>{bundle.version}</span>
                            <span className=''>{bundle.caption === 'sub' ? "Phụ đề" : bundle.caption==="voice"?"Lồng tiếng":""}</span>
                        </p>
                        <div className='flex items-start flex-wrap ml-4 mb-3 flex-1'>
                            {
                                bundle.sessions.map((val, index) => {
                                    return (
                                        <div key={index} className='my-2 ' onClick={()=>{

                                            if(localStorage.getItem("email")&&localStorage.getItem("login")){
                                                nav(`/booking-ticket/${valueCinemaAndMovie.slug}?cinemaId=${val.cinemaId}&sessionId=${val.sessionId}`, {state: {
                                                        dayOfWeekLabel:valueTime.dayOfWeekLabel,
                                                        TheaterName:val.screenName,
                                                        ShowDate:val.showDate,
                                                        ShowTime:val.showTime,
                                                        sessionId: val.sessionId,
                                                        cinemaId: val.cinemaId,
                                                        ...valueCinemaAndMovie}
                                                })

                                            }
                                            else{
                                                actionModalLogin()

                                            }
                                        
                                        }}>
                                            {<span  className='border border-zinc-300 border-solid px-3 py-1 mx-1 mb-3 rounded-md hover:bg-zinc-200 cursor-pointer mb-2'>{val.showTime}</span>}
                                        </div>)
                                })
                            }
                        </div>
                    
                </div>)}
                
            </div>

        </div>
    );
}



const mapDispatchToProps = (dispatch) => ({

    actionModalLogin: () => {
        dispatch({ type: "TOGGLE_LOGIN", payload :undefined})
    }
});



export default connect(undefined, mapDispatchToProps)(ItemListSession);