import React,{FC} from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { dataBookingCombo } from '../../../redux/reducer/rdcBookingMovie';

interface IPropsItemComboChooseMobile {
    dataCombo:dataBookingCombo
}

const ItemComboChooseMobile:FC<IPropsItemComboChooseMobile> = ({dataCombo}) => {
    const dispatch=useDispatch()
    return (
        <div className='bg-white inline-block my-3 rounded-sm mr-2'>
            <div className='flex items-center'>
                <div className='flex items-center'> 
                    <div className="lg:w-20 md:h-16 h-12">
                        <img className='object-cover h-full' src={dataCombo.imageUrl} alt=""/>
                    </div>
                    <div className='w-20 lg:w-32 pl-2'>
                        <p className='text-sm truncate'><span>{dataCombo.number} x </span>{dataCombo.description}</p>
                        <p className='truncate'>{dataCombo.extendedDescription}</p>
                    </div>
                </div>
                <div className='p-2'>
                    <button onClick={()=>dispatch({type:"SET_DATA/resetCombo", payload:dataCombo.id})} type="button" className=' text-[16px] rounded-[50%] w-5 h-5 flex justify-center items-center hover:bg-orange-500 bg-slate-400 text-white'><IoClose/></button>
                </div>
            </div>
        </div>
    );
}

export default ItemComboChooseMobile;
