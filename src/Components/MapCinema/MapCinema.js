import React, { useEffect } from 'react';
import {MdClose} from "react-icons/md";
const MapCinema = ({dataEmbed,handleCloseMap}) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden"
        return ()=>{
            document.body.style.overflowY="initial"
        }
    },[])

    return (
        <div className='modal-popup z-[1000]' >
        <div className="modal-popup-dialog">
            <div className='modal-popup-wrapper' onClick={(e)=>{handleCloseMap(false)}}></div>
            <div className="modal-popup-content px-10 ">
                <div className='max-w-3xl bg-slate-50 relative mx-auto rounded-lg'>
                    <div className='rounded-md mx-auto relative p-1 sm:p-3 pointer-events-auto' >
                        <button type="button" className='absolute w-8 h-8 bg-zinc-300 hover:bg-orange-500 hover:text-white hover:text-[1.6rem] -top-4 -right-4 flex justify-center items-center text-2xl rounded-[50%]'
                        onClick={(e)=>{handleCloseMap(false)}}
                        ><MdClose/></button>
                        <h2 className='text-zinc-600 text-center text-2xl pt-3 pb-4 font-semibold '>{dataEmbed.cinemaName}</h2>
                        <div  className=''>
                            <div className='relative w-full overflow-hidden pt-[56.25%] '>
                               <iframe className='w-full h-full absolute top-0 right-0 left-0 bottom-0' src={dataEmbed.urlEmbed} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        // <div className='modal-popup z-[990]'
        //     onClick={(e)=>{handleCloseMap(false); console.log("OverLap")}}
        
        // >         
        //     <div className='modal-popup-dialog mx-5 sm:mx-20 '>
        //         <div className='modal-popup-content'>
        //             <div className='bg-white rounded-md mx-auto max-w-[800px] relative p-1 sm:p-3 pointer-events-auto'
        //                 onClick={(e)=>{e.stopPropagation()}}
        //                 >
        //                 <button type="button" className='absolute w-8 h-8 bg-zinc-300 hover:bg-orange-500 hover:text-white hover:text-[1.6rem] -top-4 -right-4 flex justify-center items-center text-2xl rounded-[50%]'
        //                 onClick={(e)=>{e.stopPropagation();handleCloseMap(false)}}
        //                 ><MdClose/></button>
        //                 <h2 className='text-zinc-600 text-center text-2xl pt-3 pb-4 font-semibold '>{dataEmbed.cinemaName}</h2>
        //                 <div  className=' max-w-[800px]'>
        //                     <div className='relative w-full overflow-hidden pt-[56.25%] '>
        //                        <iframe className='w-full h-full absolute top-0 right-0 left-0 bottom-0' src={dataEmbed.urlEmbed} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
                
        //     </div>
            
        // </div>
    );
}

export default MapCinema;  



// import React from 'react';
// const MapCinema = ({dataEmbed,handleCloseMap}) => {

//     return (
//         // <div className='trailer-movie fixed w-screen h-screen z-10'>
//         <div className='trailer-movie fixed bg-slate-950 w-screen h-screen right-0 overflow-x-hidden overflow-y-hidden top-0 z-[2000]'>/
//             <div onClick={()=>handleCloseMap(false)} className='overlap absolute top-0 right-0 bottom-0 left-0'>
//             </div>
//             <div className='bg-white main-trailer rounded-md -translate-y-full mx-auto max-w-[800px] p-1 sm:p-3'>
//                         <h2 className='text-zinc-600 text-center text-2xl pt-3 pb-2 font-semibold '>{dataEmbed.cinemaName}</h2>
//                 <div  className=' max-w-[800px]'>
//                     <div className='relative w-full overflow-hidden pt-[56.25%] '>
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//     );
// }

// export default MapCinema;  