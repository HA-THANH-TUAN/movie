import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import CalenderMovie from '../../Components/CalenderMovie/CalenderMovie';
import CalenderMovieMobile from '../../Components/CalenderMovieMobile/CalenderMovieMobile';
import { RootState } from '../../redux/store';
import { ICinema } from '../../models/cinema';
import { ImoviesForCinema } from '../../models/moviesForCinema';

interface ImoviesForCinemaNew extends ImoviesForCinema {
  listDate:string[]
}

const CalenderMoviePage = () => {
    const [movieForCinema, setMovieForCinema] = useState<ImoviesForCinemaNew[]>([])
    const [errorPage, setErrorPage]=useState(false)
    const [trying, setTrying]=useState(true)
    const [listDate, setListDate] = useState<string[]>([])
    const [dataCinemaChoosed, setDataCinemaChoosed] = useState<ICinema|undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [processMobile, setProcessMobile]=useState(0)
    const cinemas= useSelector((state:RootState)=>state.storeMovieCityCinemaManage.cinemas)

    useEffect(() => {
        if(dataCinemaChoosed?.code){
          setLoading(true)
          fetch(`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/cinemas/${dataCinemaChoosed.code}`)
          .then(res=>res.json())
          .then((dt:ImoviesForCinema[])=>{
            if(dt.length>0){
              const dtMoiveHandled= dt.reduce((prevMovie:ImoviesForCinemaNew[], currMovie) => {
                const listDateItem=currMovie.dates.reduce((prevList:string[], currDate ) => {
                  return [...prevList, currDate.showDate]
                },[])
                return [...prevMovie, {...currMovie, listDate: listDateItem}]
              },[])
              
              const listDate=dtMoiveHandled.reduce((prevMovie:string[], currMoive ) => {
                const uniqueDate=currMoive.listDate.filter((showDate)=>!prevMovie.includes(showDate))
                return [...prevMovie, ...uniqueDate]
              }, []).sort((a:any, b:any):number =>a.split("/").reverse().join("")-b.split("/").reverse().join(""))
              setListDate(listDate)
              setMovieForCinema(dtMoiveHandled)
            }})
            .catch(()=>{
              setErrorPage(true)
            })
            .finally(()=>{
              setLoading(false)
            })
        }
    }, [dataCinemaChoosed?.code, trying])

    return (
      <>
        {!errorPage?
        <>
            <div className=' lg:mx-auto md:mx-5 max-w-7xl min-h-screen'>
              <CalenderMovie cinemas={cinemas} loading={loading} dataCinemaChoosed={dataCinemaChoosed} setDataCinemaChoosed={setDataCinemaChoosed} setProcessMobile={setProcessMobile} dataMovieForCinema={movieForCinema}/>
              {<CalenderMovieMobile loading={loading} listDate={listDate} dataCinemaChoosed={dataCinemaChoosed} setDataCinemaChoosed={setDataCinemaChoosed} dataMovieForCinema={movieForCinema} setProcessMobile={setProcessMobile} processMobile={processMobile} cinemas={cinemas} />}
              <NavBarMobile/>
            </div>
            </>:
            <div className='text-center h-[80vh] flex flex-col justify-center items-center'>
              <h1 className='text-3xl font-medium mb-10 '>Đã xảy ra lỗi</h1>
              <button className='text-lg py-2 px-3  text-white bg-orange-500 rounded hover:cursor-pointer hover:opacity-80' onClick={()=>setTrying(!trying)}> Thử lại</button>
            </div>

          }
       </>
    );
}

export default CalenderMoviePage;
