import React from 'react';
import { useSelector } from 'react-redux';
import ItemCombo from './ItemCombo/ItemCombo';

const BookingCombo = () => {
    const dataBookingCombo=useSelector((state)=>state.bookingMovieManage.dataBookingCombo)
    const total=Object.keys(dataBookingCombo).reduce((previousValue, currentValue) =>dataBookingCombo[currentValue].displayPrice*dataBookingCombo[currentValue].number+previousValue , 0)
  
    return (
        <div className='mx-5 mb-20 sm:mb-3'>
            {Object.keys(dataBookingCombo)?.length?<div className=''>
                <div className=' [&:nth-child(n)]:text-xl [&:nth-child(n)]:font-bold item-combo bg-orange p-2 bg-zinc-300 hidden md:flex'>
                    <div className=' text-center md:basis-8/12 xl:basis-7/12'>COMBO</div>
    
                    <p className='md:flex md:basis-4/12 xl:basis-5/12 md:text-center items-center mt-4 md:m-0 md:ml-3 justify-between hidden'><span className='basis-6/12'>Số lượng</span><span className='basis-6/12'>Giá (VNĐ)</span></p>
                </div>
                {Object.keys(dataBookingCombo).map(idCombo=><ItemCombo key={idCombo} dataItemCombo={dataBookingCombo[idCombo]}/>)}
                <div className='bg-orange-500 font-bold text-2xl  hidden lg:flex text-white py-2'>
                    <p className='md:basis-10/12 ml-2'>Tổng: </p> <p className='md:basis-3/12 text-center'>
                        {String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                    </p>
                </div>
            </div>:""}

        </div>
    );

}


export default BookingCombo

