import React,{useEffect,FC} from 'react';
import { useSelector } from 'react-redux';
import {MdClose} from "react-icons/md";
import "./VerifyTicket.scss"
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface IPropsVerifyTicket{
    slug?:string,
    urlSearch:string,
    handleClosePopUp:(a:any)=>void,
}

const VerifyTicket:FC<IPropsVerifyTicket> = ({slug, urlSearch, handleClosePopUp}) => {
    console.log(slug, urlSearch);
    const nav=useNavigate()
    const dateObj:Record<string, string|undefined>={
        Mon:"Thứ hai", Tue: "Thứ ba", Wed:"Thứ tư", Thu: "Thứ năm", Fri:"Thứ sáu", Sat:"Thứ 7", Sun: "Chủ nhật"
    }

    const inforMovieBooking=useSelector((state:RootState)=>state.bookingMovieManage.inforMovieBooking)
    const dataBookingCombo=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingCombo)
    const dataBookingSeat=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingSeat)
    const {TheaterName,CinemaName,ImageLandscape,dayOfWeekLabel,ShowTime, ShowDate,FilmName,age}=inforMovieBooking

    const totalSeat=Object.keys(dataBookingSeat).reduce((prev,curr)=>dataBookingSeat[curr].seatsNameChoosed.length*dataBookingSeat[curr].displayPrice+prev,0)
    const total=Object.keys(dataBookingCombo).reduce((prev,curr)=>dataBookingCombo[curr].number*dataBookingCombo[curr].displayPrice+prev,totalSeat)

    useEffect(()=>{
        document.body.style.overflowY="hidden"
        return ()=>{
        document.body.style.overflowY="initial"
    }},[])
    
    const handleSendDataPay=()=>{
        const {age,dayOfWeekLabel, ShowDate, ShowTime , ...restInfor}=inforMovieBooking
        const listSeat=Object.values(dataBookingSeat).reduce((list:string[], current)=>[...list, ...current.seatsNameChoosed],[]).join(",")
        const listCombo=Object.values(dataBookingCombo).reduce((list:string[], current)=>[...list, current.description],[]).join(",")
        nav(`/thanh-toan/${slug}${urlSearch}`, {
            replace:true,
            state:{
                totalPrice:total,
                listSeatString:listSeat,
                listComboString:listCombo,
                inforFilm:{...restInfor, ShowTime: `${ShowDate?.split("/").reverse().join("-")}T${ShowTime}Z`}
            }
        })
        
    }
    return (
        <div className='modal-popup z-[1100]' >
            <div className="modal-popup-dialog">
                <div className='modal-popup-wrapper' onClick={(e)=>handleClosePopUp(e)}></div>
                <div className="modal-popup-content px-10 ">
                    <div className='max-w-sm bg-slate-50 relative mx-auto pb-8 rounded-lg'>
                        <button onClick={(e)=>handleClosePopUp(e)} className=' absolute hover:bg-orange-500 hover:text-white -top-4 -right-4 w-8 h-8 text-xl flex justify-center items-center rounded-[50%] bg-white text-black' type="button"> <MdClose/> </button>
                        <div className='ticked'>
                            <div className='flex flex-col'>
                                <img className='rounded-t-md ' src={ImageLandscape} alt=""/>
                                <h2 className='text-center font-bold text-2xl my-3 mx-4'>{FilmName}</h2>
                            </div>
                            {Number(age)>=13?<div className='flex text-red-600 font-medium px-3'><p className='w-8 mr-2'><span className='inline-block px-[6px] py-[1px] bg-orange-500 text-white rounded'>{`C${age}`}</span></p> (*) Phim chỉ dành cho khán giả từ {age} tuổi trở lên</div>:undefined}
                            <div className='mx-4'>
                                <p><span className='font-semibold'>Rạp: </span> {CinemaName} | {TheaterName}</p>
                                <p><span className='font-semibold'>Suất chiếu: </span> {ShowTime} | {dayOfWeekLabel&&dateObj[dayOfWeekLabel]}, {ShowDate}</p>
                                <hr/>

                                <div>
                                    <p className="text-center my-2 font-bold text-lg ">Thông tin giao dịch</p>
                                    <ul>
                                        {Object.keys(dataBookingSeat).map(id=>
                                            ( dataBookingSeat[id].seatsNameChoosed.length ? 
                                                <li key={id}><p className='flex justify-between'>
                                                    <span className='max-w-[180px] sm:max-w-[240px]'><span className='font-medium'>{dataBookingSeat[id].seatsNameChoosed.length} x {dataBookingSeat[id].name}</span> - {dataBookingSeat[id].seatsNameChoosed.join(" , ")} </span>
                                                    <span className='ml-4 font-bold'>{String(dataBookingSeat[id].seatsNameChoosed.length*dataBookingSeat[id].displayPrice*1).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span></p>
                                                </li> 
                                                : undefined)
                                        )}
                                        <li><hr/></li>
                                        <li>
                                            {Object.keys(dataBookingCombo).length?
                                            Object.keys(dataBookingCombo).map(id=><p key={id} className={` flex justify-between  ${dataBookingCombo[id].number?undefined:"hidden"}`}>
                                                <span className=''>
                                                    <span className='font-medium'>{dataBookingCombo[id].number}  x  </span>{dataBookingCombo[id].description}
                                                </span>
                                                <span className='ml-4 font-bold'>{String(dataBookingCombo[id].number*dataBookingCombo[id].displayPrice).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span>
                                            </p>):""}
                                        </li>
                                        <li className='flex justify-between font-bold text-xl'><span className=''>Tổng cộng : </span><span className='ml-4 text-orange-500'>{String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span></li>
                                        <li className='justify-evenly flex mt-4'>
                                            <button onClick={handleSendDataPay} className={`bg-orange-500 px-3 py-2 rounded-md font-semibold text-white hover:bg-orange-400 transition-colors }`} type="button"> THANH TOÁN </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    );
}

export default VerifyTicket;
// import React,{useEffect} from 'react';
// import { useSelector } from 'react-redux';
// import {MdClose} from "react-icons/md";
// import "./VerifyTicket.scss"
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// const VerifyTicket = ({slug, urlSearch, handleClosePopUp}) => {
//     console.log(slug, urlSearch);
//     const nav=useNavigate()
//     const dateObj={
//         Mon:"Thứ hai", Tue: "Thứ ba", Wed:"Thứ tư", Thu: "Thứ năm", Fri:"Thứ sáu", Sat:"Thứ 7", Sun: "Chủ nhật"
//     }

//     const inforMovieBooking=useSelector(state=>state.bookingMovieManage.inforMovieBooking)
//     const dataBookingCombo=useSelector(state=>state.bookingMovieManage.dataBookingCombo)
//     const dataBookingSeat=useSelector(state=>state.bookingMovieManage.dataBookingSeat)
//     const {TheaterName,CinemaName,ImageLandscape,dayOfWeekLabel,ShowTime, ShowDate,FilmName,age}=inforMovieBooking

//     const totalSeat=Object.keys(dataBookingSeat).reduce((prev,curr)=>dataBookingSeat[curr].seatsNameChoosed.length*dataBookingSeat[curr].displayPrice+prev,0)
//     const total=Object.keys(dataBookingCombo).reduce((prev,curr)=>dataBookingCombo[curr].number*dataBookingCombo[curr].displayPrice+prev,totalSeat)

//     useEffect(()=>{
//         document.body.style.overflowY="hidden"
//         return ()=>{
//         document.body.style.overflowY="initial"
//     }},[])
    
//     const handleSendDataPay=()=>{
//         const {age,dayOfWeekLabel, ShowDate, ShowTime , ...restInfor}=inforMovieBooking
//         const listSeat=Object.values(dataBookingSeat).reduce((list, current)=>[...list, ...current.seatsNameChoosed],[]).join(",")
//         const listCombo=Object.values(dataBookingCombo).reduce((list, current)=>[...list, current.description],[]).join(",")
//         nav(`/thanh-toan/${slug}${urlSearch}`, {
//             replace:true,
//             state:{
//                 totalPrice:total,
//                 listSeatString:listSeat,
//                 listComboString:listCombo,
//                 inforFilm:{...restInfor, ShowTime: `${ShowDate.split("/").reverse().join("-")}T${ShowTime}Z`}
//             }
//         })
        
//     }
//     return (
//         <div className='modal-popup z-[1100]' >
//             <div className="modal-popup-dialog">
//                 <div className='modal-popup-wrapper' onClick={(e)=>handleClosePopUp(e)}></div>
//                 <div className="modal-popup-content px-10 ">
//                     <div className='max-w-sm bg-slate-50 relative mx-auto pb-8 rounded-lg'>
//                         <button onClick={(e)=>handleClosePopUp(e)} className=' absolute hover:bg-orange-500 hover:text-white -top-4 -right-4 w-8 h-8 text-xl flex justify-center items-center rounded-[50%] bg-white text-black' type="button"> <MdClose/> </button>
//                         <div className='ticked'>
//                             <div className='flex flex-col'>
//                                 <img className='rounded-t-md ' src={ImageLandscape} alt=""/>
//                                 <h2 className='text-center font-bold text-2xl my-3 mx-4'>{FilmName}</h2>
//                             </div>
//                             {age>0?<div className='flex text-red-600 font-medium mx-4'><p className='w-8 mr-2'><img className='w-full' src={age?`https://www.galaxycine.vn/website/images/ic-c${age}.png`:undefined} alt=""/></p> (*) Phim chỉ dành cho khán giả từ {age} tuổi trở lên</div>:undefined}
//                             <div className='mx-4'>
//                                 <p><span className='font-semibold'>Rạp: </span> {CinemaName} | {TheaterName}</p>
//                                 <p><span className='font-semibold'>Suất chiếu: </span> {ShowTime} | {dateObj[dayOfWeekLabel]}, {ShowDate}</p>
//                                 <hr/>

//                                 <div>
//                                     <p className="text-center my-2 font-bold text-lg ">Thông tin giao dịch</p>
//                                     <ul>
//                                         {Object.keys(dataBookingSeat).map(id=>
//                                             ( dataBookingSeat[id].seatsNameChoosed.length ? 
//                                                 <li key={id}><p className='flex justify-between'>
//                                                     <span className='max-w-[180px] sm:max-w-[240px]'><span className='font-medium'>{dataBookingSeat[id].seatsNameChoosed.length} x {dataBookingSeat[id].name}</span> - {dataBookingSeat[id].seatsNameChoosed.join(" , ")} </span>
//                                                     <span className='ml-4 font-bold'>{String(dataBookingSeat[id].seatsNameChoosed.length*dataBookingSeat[id].displayPrice*1).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span></p>
//                                                 </li> 
//                                                 : undefined)
//                                         )}
//                                         <li><hr/></li>
//                                         <li>
//                                             {Object.keys(dataBookingCombo).length?
//                                             Object.keys(dataBookingCombo).map(id=><p key={id} className={` flex justify-between  ${dataBookingCombo[id].number?undefined:"hidden"}`}>
//                                                 <span className=''>
//                                                     <span className='font-medium'>{dataBookingCombo[id].number}  x  </span>{dataBookingCombo[id].description}
//                                                 </span>
//                                                 <span className='ml-4 font-bold'>{String(dataBookingCombo[id].number*dataBookingCombo[id].displayPrice).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span>
//                                             </p>):""}
//                                         </li>
//                                         <li className='flex justify-between font-bold text-xl'><span className=''>Tổng cộng : </span><span className='ml-4 text-orange-500'>{String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span></li>
//                                         <li className='justify-evenly flex mt-4'>
//                                             <button onClick={handleSendDataPay} className={`bg-orange-500 px-3 py-2 rounded-md font-semibold text-white hover:bg-orange-400 transition-colors }`} type="button"> THANH TOÁN </button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

    
//     );
// }

// export default VerifyTicket;
