import React, { useEffect } from 'react';
import "./TrailerMovie.scss"
import { useSelector } from 'react-redux';
import {MdClose} from "react-icons/md";
import { RootState } from '../../redux/store';
 
interface IPropsTrailerMovie{
    handleCloseTrailerPopUp:()=>void
}

const TrailerMovie = ({handleCloseTrailerPopUp}:IPropsTrailerMovie) => {
    const {name, embed}=useSelector((state:RootState)=>{
        const {trailer, name}=state.movieDetailPageManage.movie
        return {name, embed:trailer?.replace("watch?v=", "embed/")}
    }) 
    useEffect(()=>{
        document.body.style.overflow="none"
        // document.body.overflowY="none"
        return ()=>{
            document.body.style.overflowY="initial"
        }
    },[])

    return (
        <div className='modal-popup z-[1000]' >
            <div className="modal-popup-dialog">
                <div className='modal-popup-wrapper' onClick={handleCloseTrailerPopUp}></div>
                <div className="modal-popup-content px-7 ">
                    <div className='bg-white rounded-md relative mx-auto max-w-[800px] p-2 sm:p-3' >
                        <button type="button" className='absolute w-8 h-8 bg-zinc-300 hover:bg-orange-500 hover:text-white hover:text-[1.6rem] -top-4 -right-4 flex justify-center items-center text-2xl rounded-[50%]'
                            onClick={(e)=>{handleCloseTrailerPopUp()}}
                        ><MdClose/></button>
                        <h2 className='text-zinc-600 text-center text-2xl mx-2 pt-4 pb-3 font-semibold '>{name}</h2>
                        <div  className=' max-w-[800px]'>
                            <div className='relative w-full overflow-hidden pt-[56.25%] '>
                                <iframe  className='w-full h-full absolute top-0 right-0 left-0 bottom-0' src={embed} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default TrailerMovie;