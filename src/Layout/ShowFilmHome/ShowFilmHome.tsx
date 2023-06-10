import React,{useState} from 'react'
import { FiChevronRight } from 'react-icons/fi'
import MovieCartList from '../../Components/MovieCartList.js/MovieCartList'
import { useNavigate } from 'react-router-dom'


interface IPropsShowFilmHome{
  allMovie:{movieShowing:any[],
    movieCommingSoon:any[]
  }
}

 const ShowFilmHome:React.FC<IPropsShowFilmHome>=({allMovie})=> {
  const nav=useNavigate()

  const [listType,setListType]=useState<number>(0)
  return (
    <>
      <nav className='nav-movie font-semibold'>
        <div className='hidden justify-center mt-10 mb-12 font-bold md:flex nav-tablet'>
            <span onClick={()=>{setListType(0)}} className={`nav-item-tablet text-3xl pb pt-2 mr-10 ${listType===0 ? "active":"" } `}>PHIM ĐANG CHIẾU</span>
            <span onClick={()=>{setListType(1)}} className={` nav-item-tablet text-3xl pb pt-2 ${listType!==0 ? "active":""}`}>PHIM SẮP CHIẾU</span>
        </div>
        <div className=' flex mb-3  md:hidden items-center nav-mobile  '>
            <span onClick={()=>{setListType(0)}} className={`mr-4 py-2 font-medium text-xl text-zinc-500 transition-colors duration-300 ${listType===0 ? "active":""}`}>Đang chiếu</span>
            <span onClick={()=>{setListType(1)}} className={`py-2 font-medium text-xl text-zinc-500 transition-colors duration-300 ${listType!==0 ? "active":""}`}>Sắp chiếu</span>
        </div>
      </nav>
       <MovieCartList isHome={true} full={false} movieCartList={listType==0 ?  allMovie.movieShowing : allMovie.movieCommingSoon}/>
       {allMovie.movieShowing.length!=0&&<div className='flex justify-center md:justify-end mt-6'>
           <button className='hover:bg-orange-500 hidden font-medium md:block rounded hover:text-white border-orange-500 border border-solid
              px-2 py-[6px]' type="button"
              onClick={()=>listType==0? nav("/phim-dang-chieu"):nav("/phim-sap-chieu")}
              >Xem thêm</button>
           <button className='md:hidden text-orange-500 rounded border-orange-500 border border-solid
              px-2 py-[6px] flex-1 flex justify-center items-center' type="button"
              onClick={()=>listType==0? nav("/phim-dang-chieu"):nav("/phim-sap-chieu")}
              >Xem thêm <span className='ml-1'><FiChevronRight/></span> </button>
       </div>}
    </>
  )
}

export default ShowFilmHome