import { useDispatch, useSelector } from "react-redux"

const LayoutSeats = ({dataSeatCinema}) => {
    const dispatch=useDispatch()
    const dataSeatBooked=useSelector(state=>{return state.bookingMovieManage.dataSeatBooked})
    const dataBookingSeat=useSelector(state=>{return state.bookingMovieManage.dataBookingSeat})
    const dataStandard=dataSeatCinema[0]
    const dataStandardCouple= dataSeatCinema[1]
    
    const fillPositonSeats=(seatColunm,columnCount,areaCategoryCode,name)=>{
        const column=[...Array(columnCount)]
        seatColunm.forEach((col,i)=>{
            column[col.position.columnIndex]={id: col.id,areaCategoryCode,name}
        })
        return column
    }
    const createSeatsStructure=(dataStandard,fillPositonSeats )=>{
        const seatsStructure={}
        dataStandard.rows.forEach((row,i)=>{
            if(row.physicalName){
                seatsStructure[`${row.physicalName}`]= fillPositonSeats(row.seats, dataStandard.columnCount, dataStandard.areaCategoryCode,row.physicalName )
            }
            else{
                seatsStructure[`_${i}`]=[...Array(dataStandard.columnCount)]
            }
        })
        return seatsStructure
    }
    const result=createSeatsStructure(dataStandard,fillPositonSeats)
    const resultCouple=createSeatsStructure(dataStandardCouple,fillPositonSeats)

    return (
        <>
        {dataSeatCinema&&
                    <section className=''>
                        <div className="">
                            <div className="w-full overflow-x-auto bg-slate-100 px-5 py-10">
                                <table className=''>
                                    <tbody>

                                    {Object.keys(resultCouple).reverse().map((seatName,i)=><tr key={i} className=''>
                                        <td  className=' text-center font-medium text-lg pr-5'>{seatName}</td> {resultCouple[seatName].map((seat,j)=>{
                                            if(seat){
                                                if(seat.id%2==1)return <td colSpan={2} className='' key={j}><p onClick={()=>{
                                                    dispatch({type:"SET_DATA/chooseSeat",payload:{
                                                        id: `${seat.areaCategoryCode}false`,
                                                        seatName:`${seatName}${seat.id}-${seatName}${seat.id*1+1}`
                                                    }})
                                                }} 
                                                className={`w-12 h-6 text-[10px] items-center font-bold border-2 lg:border-2 border-solid text-center rounded flex justify-around cursor-pointer
                                                md:hover:bg-orange-500 md:hover:border-orange-500 md:hover:text-white
                                                ${dataSeatBooked.includes(`${seatName}${seat.id}-${seatName}${seat.id*1+1}`) ? "bg-zinc-600 border-zinc-600 pointer-events-none text-zinc-600" :
                                                    dataBookingSeat[`${seat.areaCategoryCode}false`].seatsNameChoosed.includes(`${seatName}${seat.id}-${seatName}${seat.id*1+1}`) ?
                                                    "bg-orange-500 border-orange-500 text-white": "border-blue-600"}`}>
                                                <span>{seatName}{seat.id}</span><span>{seatName}{seat.id*1+1}</span></p>

                                            
                                            </td>}
                                            else return <td className='  invisible ' key={j}> <p className='w-6 border lg:border-2 border-solid border-zinc-600'>{"-"}</p></td>
                                        })}
                                        <td className={ ` text-center font-medium text-lg pl-5 ${seatName.includes("_")? "invisible": undefined}`} >{seatName}</td>
                                    </tr>)}
                                        {Object.keys(result).map((seatName,i)=><tr key={i} className=''>
                                            <td className={` text-center font-medium text-lg pr-5 ${seatName.includes("_")? "invisible": undefined}`}>{seatName}</td>
                                            {result[seatName].map((seat,j)=>{
                                                if(seat)return <td className='w-6 h-6 text-[10px]' key={j}><p onClick={()=>{
                                                    dispatch({type:"SET_DATA/chooseSeat",payload:{
                                                        id: `${seat.areaCategoryCode}false`,
                                                        seatName:`${seatName}${seat.id}`
                                                    }})
                                                }} 
                                                className={`w-6 h-6 text-[9px] sm:text-[10px] border-2 lg:border-2 border-solid font-semibold flex items-center justify-center text-center rounded cursor-pointer  
                                                md:hover:bg-orange-500 md:hover:border-orange-500 md:hover:text-white
                                                ${dataSeatBooked.includes(`${seatName}${seat.id}`) ? "bg-zinc-600 pointer-events-none border-zinc-600 text-zinc-600" : 
                                                    dataBookingSeat[`${seat.areaCategoryCode}false`].seatsNameChoosed.includes(`${seatName}${seat.id}`) ? 
                                                    "border-orange-500 bg-orange-500 text-white": "border-zinc-600"}`}>{`${seatName}${seat.id}`}</p></td>
                                                else return <td className=' invisible  w-6 h-6 text-[10px]' key={j}><p className='border lg:border-2 border-solid border-zinc-600 text-center rounded'>{"-"}</p></td>
                                            })} 
                                        <td className={` text-center font-medium text-lg pl-5 ${seatName.includes("_")? "invisible": undefined}`}>{seatName}</td>
                                    </tr>)}
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr className="">
                                            <td colSpan={100} className=''>
                                                <p className="max-w-md mx-auto mt-10  border-b-8 border-solid border-orange-500"></p>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="w-full bg-red-500">


                           </div>
                                
                            </div>
                           
                            
                        </div>
             
                    </section>
          }
        
        </>
               
    );
}



export default LayoutSeats