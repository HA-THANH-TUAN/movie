
import { Navigation, Pagination,Autoplay,EffectFade  } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import img73 from "../../assets/images/7_3.png"
import img32 from "../../assets/images/3_2.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
import "./SliderShow.scss"
import { Link } from 'react-router-dom';
export default ({movieShowing}) => {
  return (
    <div className='mb-10 slider-show mx-1 md:mx-0'>
            {
              movieShowing.length==0 ?
              <>
                <div className='seleton-image rounded my-2 mx-1 hidden md:block' >
                   <img className='w-full opacity-0' src={img73} alt=""/>
                </div>
                <div className='seleton-image rounded my-2 mx-1 md:hidden' >
                   <img className='w-full opacity-0' src={img32} alt=""/>
                </div>
              </>
              :
              <>
                <Swiper
                  modules={[Navigation, EffectFade,Pagination,Autoplay]}
                  loop={true}
                  spaceBetween={50}
                  slidesPerView={1}
                  grabCursor={true}
                  effect={"cube"}
                  pagination={{
                    clickable:true,type:'bullets',
                    bulletClass:"lg:w-10 h-2 md:w-8 w-2 rounded-md inline-block bg-slate-100 cursor-pointer bg-clip-padding bulletClass lg:mx-3 mx-1",
                    bulletActiveClass:"bulletActiveClass-custum-active"}}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter:true,
                  }}
                >
                    {
                        movieShowing.map((movie, i)=>
                        <SwiperSlide key={i}>
                            <Link to={`/dat-ve/${movie.slug}`}><img className='w-full hidden md:block' src={movie.imageLandscapeMobile} alt=""/></Link>
                            <Link to={`/dat-ve/${movie.slug}`}><img className='w-full rounded-sm md:hidden' src={movie.imageLandscape} alt=""/></Link>
                            
                        </SwiperSlide>
                        )
                    }
                </Swiper>
              </>
            }
    </div>
  );
};



















