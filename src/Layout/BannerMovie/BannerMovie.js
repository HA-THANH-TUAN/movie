import React,{useState}from 'react'
import CartDetailMovie from './CartDetailMovie/CartDetailMovie'
import CartDetailMovieMobile from './CartDetailMovieMobile/CartDetailMovieMobile'
import { useSelector } from 'react-redux';
import SkeletonBannerMovie from './SkeletonBannerMovie/SkeletonBannerMovie';
import TrailerMovie from './../../Components/TrailerMovie/TrailerMovie';
export default function BannerMovie({slugUrl}) {
  const movie=useSelector((state)=>state.movieDetailPageManage.movie)
  const [trailerPopUp, setTrailerPopUp]=useState(false)
  return (
    <>  
      {
        movie.slug? 
        <>
        {trailerPopUp&&< TrailerMovie handleCloseTrailerPopUp={()=>{setTrailerPopUp(false)}}/>}
        <div className='hidden sm:block mb-4'>
          <CartDetailMovie handleOnTrailerPopUp={()=>{setTrailerPopUp(true)}} movie={movie}/>
        </div>
        <div className='sm:hidden'>
          <CartDetailMovieMobile handleOnTrailerPopUp={()=>{setTrailerPopUp(true) }} movie={movie} />
        </div> 
      </>:<SkeletonBannerMovie/>}
    </>
  )
}
