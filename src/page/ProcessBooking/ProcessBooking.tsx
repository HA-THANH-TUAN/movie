import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ticked from '../../Layout/Ticket/Ticket';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BarBookingMobile from '../../Components/BarBookingMobile/BarBookingMobile';
import {HiArrowNarrowLeft} from "react-icons/hi"
import {RiErrorWarningFill} from "react-icons/ri"
import { RootState } from '../../redux/store';
import PopUpNotify from '../../Components/PopUpNotify/PopUpNotify';
import VerifyTicket from './../../Layout/VerifyTicket/VerifyTicket';
import BookingCombo from './../../Layout/BookingCombo/BookingCombo';
import BookingSeat from './../../Layout/BookingSeat/BookingSeat';
import Spinner from '../../Components/Spinner/Spinner';
import NotFound from '../NotFound/NotFound';



const ProcessBooking = () => {
    const [popUpVerify, setPopUpVerify] = useState(false)
    const [popUpCheckChooseSeat, setPopUpCheckChooseSeat] = useState<{status:boolean, message:string}>({
        status:false,
        message:""
    })
   
    const [processBooking, setProcessBooking]=useState<number>(0)
    const nav=useNavigate()
    const prams=useParams()
    const dispatch=useDispatch()
    const location =useLocation()

    const statusPage=useSelector((state:RootState)=>state.bookingMovieManage.statusPage)
    const loading=useSelector((state:RootState)=>state.bookingMovieManage.loading)
    const FilmName=useSelector((state:RootState)=>state.bookingMovieManage.inforMovieBooking.FilmName)
    const dataBookingSeat=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingSeat)
    const cinemaAndSession:any= location.search.replace(/ /g,"").match(/\?id=(?<id>[^&]+)&cimenaId=(?<cinemaId>[^&]+)&sessionId=(?<sessionId>[^&]+)/)

    
    useEffect(()=>{
        if(FilmName){
            if(cinemaAndSession){
                dispatch({type:"GET_DATA/AllDataBooking", payload: cinemaAndSession.groups})
            }
            else{
                dispatch({
                    type:"SET_DATA/errorMovieDetailPage"
                })
            }
        }
        else{
            
            dispatch({type:"GET_DATA/AllDataBookingPage", payload: {...cinemaAndSession?.groups,slug:prams.infor}})
        }
        return ()=>{
            dispatch({type:"SET_DATA/ResetDataProcessBooking"})
        }
    },[])

const handleCheckChooseSeats=()=>{
    const arraySeat=[]
    for(let i in dataBookingSeat){
        arraySeat.push(...dataBookingSeat[i].seatsNameChoosed)
    }
    const result=arraySeat.join(",").match(/[A-Z]\d+/g)
    return result?result.length:0
}
    
    const handleClosePopUp=()=>{
        setPopUpVerify(false)
    }

    const handleProcessBookingBack=(process:number)=>{
        if(process>0){ setProcessBooking(processBooking=>processBooking-1)}    
    }

    const handleProcessBookingNext=(process:number)=>{
        const amoutSeats =handleCheckChooseSeats() 
        if(process<1){
            if(amoutSeats>0&&amoutSeats<9){
                setProcessBooking(processBooking=>processBooking+1)
            }
            else if(amoutSeats===0){
                setPopUpCheckChooseSeat({
                    status:true,
                    message:"Hãy chọn ghế trước !"
                })
            }
            else if(amoutSeats>8){
                setPopUpCheckChooseSeat({
                    status:true,
                    message:" Số lượng ghế không vượt quá 8 !"
                })
            }
        }
        if(process==1){setPopUpVerify(true)}
    }

    const handleProcessBooking=(type:any)=>{
        if(type=="back"){handleProcessBookingBack(processBooking) }
        else{handleProcessBookingNext(processBooking)}
    }

    return (
        <div>
            {   loading? 
                <>
                    <div className='w-screen h-screen bg-[#000000c5] fixed top-0 right-0 z-[1000] flex justify-center items-center' >
                        <div className="px-7">
                            <Spinner
                             diameter={30}
                             weight={4}
                             color={"#ff7b00"}
                             bg={"inherit"}
                             />
                        </div>
                    </div>
                    <div className='h-[95vh] w-full'></div>
                    
                </>:
                <>
                    {statusPage?
                        <>
                            {
                                popUpCheckChooseSeat.status? 
                                    <PopUpNotify message={popUpCheckChooseSeat.message} handleOffPopUp={()=>setPopUpCheckChooseSeat({status:false, message:""})}>{<span><RiErrorWarningFill/></span>}</PopUpNotify>:
                                undefined
                            }
                            <div className='min-h-screen flex flex-col mb-20  xl:mb-07'>
                                <div className='sticky top-0 flex sm:hidden bg-blue-500 text-lg items-center text-white py-3'>
                                    <span onClick={()=>{
                                            if(processBooking>0)return handleProcessBookingBack(processBooking )
                                            if(processBooking==0) nav(-1)
                                        }} 
                                        className='w-16 px-2 text-2xl'><HiArrowNarrowLeft/></span>
                                        <span className='truncate text-2xl'>{FilmName}</span>
                                </div>
                                <div className='xl:max-w-7xl sm:mt-16 mx-auto bg-zinc-300 md:bg-transparent'>
                                    <div className='grid grid-cols-12'>
                                        <section className='xl:col-span-8 col-span-12 h-auto'>
                                            {processBooking==0 ? <BookingSeat/> : processBooking == 1 ? <BookingCombo/> : undefined }
                                        </section>
                                        <section className='xl:col-span-4 xl:block hidden'>
                                           <Ticked handleProcessBooking={handleProcessBooking}></Ticked>
                                        </section>
                                    </div>
                                </div>
                                <div className='xl:hidden fixed sm:static w-full bottom-0 right-0 left-0'>
                                    <BarBookingMobile handleProcessBooking={handleProcessBooking}/>
                                </div>
                            </div>
                            { popUpVerify&&<VerifyTicket slug={prams.infor} urlSearch={location.search} handleClosePopUp={handleClosePopUp}/>}
                        </>:
                        <NotFound/>
                    }
                </>
            }
        </div>
    );
}

export default ProcessBooking;
