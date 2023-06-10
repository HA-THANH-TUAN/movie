import React from 'react';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Ticket = (props) => {
    const nav=useNavigate()
    const dateObj={
        Mon:"Thứ hai", Tue: "Thứ ba", Wed:"Thứ tư", Thu: "Thứ năm", Fri:"Thứ sáu", Sat:"Thứ 7", Sun: "Chủ nhật"
    }

    const inforMovieBooking=useSelector(state=>state.bookingMovieManage.inforMovieBooking)
    const dataBookingCombo=useSelector(state=>state.bookingMovieManage.dataBookingCombo)
    const dataBookingSeat=useSelector(state=>state.bookingMovieManage.dataBookingSeat)
    
    const {TheaterName,CinemaName,ImageLandscape,dayOfWeekLabel,ShowTime, ShowDate,FilmName,age}=inforMovieBooking
    const totalSeat=Object.keys(dataBookingSeat).reduce((prev,curr)=>dataBookingSeat[curr].seatsNameChoosed.length*dataBookingSeat[curr].displayPrice+prev,0)
    const total=Object.keys(dataBookingCombo).reduce((prev,curr)=>dataBookingCombo[curr].number*dataBookingCombo[curr].displayPrice+prev,totalSeat)
    return (
        <div className='ticked ml-10 bg-slate-200'>
            {
                Object.keys(inforMovieBooking).length ? <>
                    <div className='flex flex-col'>
                        <img className='' src={ImageLandscape} alt=""/>
                        <h2 className='text-center font-bold text-xl my-2 mx-3'>{FilmName}</h2>
                    </div>
                    <div className='mx-5'>
                        {age>=13?<div className='flex text-red-600 font-medium'><p className='w-8 mr-2'><span className='inline-block px-[6px] py-[1px] bg-orange-500 text-white rounded'>{`C${age}`}</span></p> (*) Phim chỉ dành cho khán giả từ {age} tuổi trở lên</div>:undefined}
                        <div className=''>
                            <p><span className='font-semibold'>Rạp: </span> {CinemaName} | {TheaterName}</p>
                            <p><span className='font-semibold'>Suất chiếu: </span> {ShowTime} | {dateObj[dayOfWeekLabel]}, {ShowDate}</p>
                            <hr/>
                            <div>
                                <p className="text-center my-2 font-bold text-lg ">Thông tin giao dịch</p>
                                <ul>
                                    {Object.keys(dataBookingSeat).map(id=>
                                        ( dataBookingSeat[id].seatsNameChoosed.length ? 
                                            <li key={id}>
                                                <p className='flex justify-between'>
                                                <span className='max-w-[250px]'><span className='font-semibold'>{dataBookingSeat[id].seatsNameChoosed.length} x {dataBookingSeat[id].name}</span> - {dataBookingSeat[id].seatsNameChoosed.join(" , ")} </span> 
                                                <span className='ml-4 font-bold'>{String(dataBookingSeat[id].seatsNameChoosed.length*dataBookingSeat[id].displayPrice*1).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span>
                                               </p>
                                            </li> 
                                            : undefined)
                                    )}
                                    <li><hr/></li>
                                    <li>
                                        {Object.keys(dataBookingCombo).length?
                                        Object.keys(dataBookingCombo).map(id=><p key={id} className={` flex justify-between  ${dataBookingCombo[id].number?undefined:"hidden"}`}><span className=''><span className='font-semibold'>{dataBookingCombo[id].number}  x  </span >{dataBookingCombo[id].description}</span><span className='ml-4 font-bold'>{ String(dataBookingCombo[id].number*dataBookingCombo[id].displayPrice).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}đ</span></p>):""}
                                    </li>
                                    <li className='flex justify-between font-bold text-xl'><span className=''>Tổng cộng : </span><span className='ml-4 text-orange-500'>{String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span></li>
                                    <li className='justify-evenly flex p-5'>
                                        <button onClick={()=>props.handleProcessBooking("back")} className={`bg-orange-500 px-3 py-2 rounded-md font-semibold text-white hover:bg-orange-400 transition-colors }`} type="button" disabled={props.process==0}> QUAY LẠI </button>
                                        <button onClick={()=>props.handleProcessBooking("next")}
                                            className={`bg-orange-500 px-3 py-2 rounded-md font-semibold text-white hover:bg-orange-400 transition-colors`}
                                            type="button" >TIẾP TỤC</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>:undefined
            }
        </div>
    );
}


export default Ticket;
