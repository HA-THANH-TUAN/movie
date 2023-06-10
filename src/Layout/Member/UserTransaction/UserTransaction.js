import moment from 'moment'
import React, { useEffect, useState } from 'react'
import  {AiOutlineFullscreen } from 'react-icons/ai'
import TicketReview from './TicketReview/TicketReview'

export default function UserTransaction() {
    const [dataTransaction, setDataTransaction]=useState([])
    const [inforTicket, setInforTicket]=useState({})
    const [popUpTicket, setPopUpTicket]=useState(false)
    useEffect(()=>{
        fetch(`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/TicketByEmail/${sessionStorage.getItem("Email")}`)
        .then((res)=>{
            if(res.status==200){
                return res.json()
            }
        })
        .then((data)=>setDataTransaction(data))
    },[])

    return (
        <div className=''>
            <div className='overflow-x-auto' >
                <table className="w-full text-sm text-left min-w-[500px] ">
                    <thead className="text-xs text-white bg-amber-600 border border-solid border-orange-600">
                        <tr>
                            <th className="px-6 py-3">MÃ VÉ</th>
                            <th className="px-6 py-3">TÊN PHIM</th>
                            <th className="px-6 py-3">THỜI GIAN ĐẶT</th>
                            <th className="px-6 py-3">SỐ GHẾ</th>
                            <th className="px-6 py-3">CHI TIẾT</th>
                        </tr>
                    </thead>
                    <tbody className=' [&>*:nth-child(2n+1)]:border-zinc-600 [&>*:nth-child(2n+1)]:border-solid [&>*:nth-child(2n+1)]:border-y border border-solid border-zinc-400'>
                        {
                            dataTransaction.map((value, i)=>{
                            return <tr key={value.Id} className={`hover:bg-slate-300`} >
                                <td className="px-6 py-4">{value.Id}</td>
                                <td className="px-6 py-4">
                                    {value.FilmName}
                                </td>
                                <td className="px-6 py-4">
                                
                                    <span className=''>{moment(value.ShowTime.replace(":00.000Z","")).format("DD-MM-YYYY")}</span>
                                    <br></br>
                                    <span className=''>{moment(value.ShowTime.replace(":00.000Z","")).format("HH:mm")}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span> Ghế: {value.SeatCode.replace(",", ", ")}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={()=>{setInforTicket({...value, ShowTime: value.ShowTime.replace(":00.000Z","")});setPopUpTicket(true)}} className='text-3xl hover:text-orange-600 hover:cursor-pointer'> <AiOutlineFullscreen/></span>
                                </td>
                            </tr>
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
            {
               popUpTicket&&<TicketReview dataReview={inforTicket} handleSetPopUpTicket={()=>{setPopUpTicket(false)}} handleSetInforTicket={()=>{setInforTicket({})}} />
            }
        </div>
    )
}
