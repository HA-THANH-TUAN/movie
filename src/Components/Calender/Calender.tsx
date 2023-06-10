import React, { useState,FC } from 'react';
// import dateFormat from 'dateformat';
import './Calender.scss';
import moment from 'moment';
import getSevenNextDate from '../../comon/getSevenNextDate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { format } from 'path';

interface ICalenderComponent {
    slugUrl?: string,
    slugMovie?:string | undefined
    availableDates:string[]
    dateStart?:string
    dateFilter?:string
    onClick?:any; 
}

const Calender:FC<ICalenderComponent> = ({slugUrl,slugMovie,availableDates,onClick, dateStart, dateFilter}) => {
    const convertDateStartToNumber= dateStart ? new Date(dateStart.split("/").reverse().join("-")).valueOf(): new Date().valueOf()
    const day:string[]=["Chủ nhật","Thứ 2","Thứ 3","Thứ 4"," Thứ 5","Thứ 6","Thứ 7"]

    const today=new Date().getDate()
    
    return (
        <div className='calender flex justify-center '>
            {
                slugUrl===slugMovie ? 
                <ul className='wraper-item hiden-scroll flex overflow-x-auto py-3 mx-2' >
                    {getSevenNextDate(convertDateStartToNumber, 7).map((dateNumber, i) =>
                        <li key={i} className={`${dateFilter===moment(dateNumber).format("DD/MM/YYYY") ? "choose-date " :""} item w-[4.2rem] text-center px-1 mx-1 sm:mx-3 flex-shrink-0 ${availableDates.includes(moment(dateNumber).format("DD/MM/YYYY"))? "date-avalible": ""} `}
                            onClick={()=>{onClick(dateNumber)}}
                        >
                            <p className=" date text-[12px] font-bold py-1">{ today===new Date(dateNumber).getDate() ? "Hôm nay" : day[new Date(dateNumber).getDay()]}</p>
                            <p className=' day text-md font-extrabold rounded-b-lg py-1  '>{new Date(dateNumber).getDate()}</p>
                        </li>
                    )}
                </ul> : 
                
                <ul className='wraper-item flex overflow-x-hidden p-3  rounded' >
                {[...Array(7)].map((dateNumber, i) =>
                    <li key={i} className="w-[4.2rem] text-center rounded-b-lg mx-1 sm:mx-3 flex-shrink-0 seleton-image">
                        <p className=" date text-[12px] font-bold py-1 bg-zinc-400"><span className='invisible'>Day</span></p>
                        <p className=' day text-md font-semibold rounded-b-lg py-1 bg-zinc-500 '><span className='invisible'>Date</span></p>
                    </li>
                )}
            </ul>

            }
        </div>
    );

}

export default Calender

