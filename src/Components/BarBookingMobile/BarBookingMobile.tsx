import React,{FC} from 'react';
import ItemComboChooseMobile from './ItemComboChooseMobile/ItemComboChooseMobile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



interface IPropsBarBookingMobile {
    handleProcessBooking:(a:string)=>void,
}
const BarBookingMobile:FC<IPropsBarBookingMobile> = (props) => {
    const dataBookingCombo=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingCombo)
    const dataBookingSeat=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingSeat)
    const totalSeat=Object.keys(dataBookingSeat).reduce((prev,curr)=>dataBookingSeat[curr].seatsNameChoosed.length*dataBookingSeat[curr].displayPrice+prev,0)
    const total=Object.keys(dataBookingCombo).reduce((prev,curr)=>dataBookingCombo[curr].number*dataBookingCombo[curr].displayPrice+prev,totalSeat)
    const listSeat=Object.keys(dataBookingSeat).map(id=>dataBookingSeat[id].seatsNameChoosed).flat().join(",").replace("-",",")

    return (
        <div className='bg-blue-500'>

            <ul className='flex overflow-auto bg-zinc-300  px-2 '>
                {Object.keys(dataBookingCombo).map(id=>
                    (  dataBookingCombo[id].number ? <li key={id} className='flex-shrink-0 '><ItemComboChooseMobile dataCombo={dataBookingCombo[id]}/></li> : undefined)
                    )}
                  
            </ul>

            <div className='flex justify-between items-center py-2 mx-2'>
                <div className='flex-1 text-slate-1000'>
                   
                    <p className='flex '><span className='font-semibold mr-1'>{listSeat ? listSeat.split(",").length : 0} x </span> ghế :&#160;
                        <span className='font-semibold truncate w-[180px] sm:w-auto '>{listSeat}</span>
                    </p>
                    <p className=''><span className='font-medium text-xl'>Tổng cộng : </span><span className='text-xl font-semibold'>{String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</span></p>
                </div>
                <button className='text-white bg-orange-600 font-medium px-4 py-3 rounded-sm mr-6 hover:opacity-75 hidden sm:block xl:hidden' onClick={()=>{props.handleProcessBooking("back")}} type="button">Trở về</button>
                <button className='text-white bg-orange-600 font-medium px-4 py-3 rounded-sm hover:opacity-75' onClick={()=>{props.handleProcessBooking("next")}} type="button">Tiếp tục</button>
            </div>
        </div>
    );
}

export default BarBookingMobile;
