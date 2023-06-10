import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SessionMovieList({cinemaDates,cinemaId,dateFilter,slugUrl,ImageLandscape,ImagePortrait,age, FilmName, cinemaName}) {
  const nav=useNavigate()
  const dispatch=useDispatch()
  const checkLogin = ()=>{
    return (sessionStorage.getItem("isLogin")=="true")&&sessionStorage.getItem("Name")
  }
  return (
    // <div className='border-t border-b-2 border-x-2 border-solid border-zinc-300 mb-10 '>
    <div className='shadow-md py-3 px-5'>
         {cinemaDates.find((v)=>v.showDate==dateFilter)?.bundles.map((typeCaption,i)=><div key={i} className=''>
             <h1 className='text-lg font-extrabold ml-3'><span className=''>{typeCaption.version.toUpperCase()}</span> {typeCaption.caption=="sub"?"Lồng tiếng":typeCaption.caption=="voice"?"Phụ đề":undefined }</h1>
             <ul className='flex items-center flex-wrap mb-3'>
                 {typeCaption.sessions.map((session,i)=><li key={i}  
                 onClick={(e)=>{
                      if(checkLogin()){
                        nav(`/booking-ticket/${slugUrl}?id=${cinemaId}&cimenaId=${session.cinemaId}&sessionId=${session.sessionId}`)
                        dispatch({
                            type:"SET_DATA/inforMovieBooking",
                            payload: {
                               age: age,
                               ShowCode:`${session.cinemaId}-${session.sessionId}`,
                               dayOfWeekLabel:session.dayOfWeekLabel,
                               CinemaName: cinemaName,
                               TheaterName: session.screenName,
                               FilmName: FilmName,
                               ImageLandscape: ImageLandscape,
                               ImagePortrait: ImagePortrait,
                               ShowTime: session.showTime,
                               ShowDate:session.showDate,
                           }
                        })
                      }else{dispatch({type:"SET_DATA/AuthenPopUpON"})}                                                          
                 }} 
                 className='bg-zinc-400 transition-colors cursor-pointer hover:bg-orange-500 mx-2 font-extrabold rounded-2xl px-5 py-1 my-2 '>{session.showTime}
                 </li>)}
             </ul>
         </div>)}
    </div>
  )
}
