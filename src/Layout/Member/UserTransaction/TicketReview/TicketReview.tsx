import React,{FC} from 'react'
import  {MdClose } from 'react-icons/md'
import moment from 'moment';
import purchasedTicket from '../../../../models/purchasedTicket';

interface IPropsTicketReview{
    dataReview: purchasedTicket,
    handleSetPopUpTicket:  () => void,
    handleSetInforTicket:  () => void,
}


export default function TicketReview({dataReview,handleSetPopUpTicket,handleSetInforTicket}:IPropsTicketReview) {
  return (
         <div className='modal'>
            <div className='modal-popup z-[1100]' >
                <div className="modal-popup-dialog">
                    <div className='modal-popup-wrapper' onClick={()=>{handleSetPopUpTicket();handleSetInforTicket()}}></div>
                    <div className="modal-popup-content px-10 ">
                        <div className='max-w-sm bg-slate-50 relative mx-auto pb-8 rounded-lg'>
                            <button onClick={()=>{handleSetPopUpTicket();handleSetInforTicket()}} className=' absolute hover:bg-orange-500 hover:text-white -top-4 -right-4 w-8 h-8 text-xl flex justify-center items-center rounded-[50%] bg-white text-black' type="button"> <MdClose/> </button>
                            <div className='p-4'>
                                <h1 className='text-2xl font-medium mb-6 text-center'>VÉ XEM PHIM</h1>
                                <div>
                                    <h2 className='text-xl font-bold text-center'>{dataReview.CinemaName.toLocaleUpperCase()}</h2>
                                        <p className='text-xl font-medium text-center'>{dataReview.TheaterName.replace(/rap/i, "Rạp")}</p>
                                    <div className='mt-6 '>
                                        <h3 className='text-2xl font-medium text-center mb-2'>{dataReview.FilmName.toLocaleUpperCase()}</h3>
                                        <p className=''><span className='font-medium'>Ngày :</span> {moment(dataReview.ShowTime).format("DD-MM-YYYY")}</p>
                                        <p className=''><span className='font-medium'>Thời gian :</span> {moment(dataReview.ShowTime).format("HH:mm")}</p>
                                        <p className=''><span className='font-medium'>Ghế :</span> {dataReview.SeatCode.replace(/,/g, ", ")}</p>
                                        {dataReview.Combo ? <div className='flex'><span className='font-medium'>Combo :</span>
                                            <ul className='pl-7 list-disc'>
                                                {dataReview.Combo.split(",").map((value, i)=><li key={i}>
                                                    {value}

                                                 </li>)}
                                            </ul>
                                        </div>:""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
