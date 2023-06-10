import React, {useState } from 'react';
import {useSelector } from 'react-redux';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';
import ErrorServer from '../ErrorServer/ErrorServer';
import { RootState } from '../../redux/store';
import SliderShow from '../../Layout/SliderShow/SliderShow';
import ShowFilmHome from './../../Layout/ShowFilmHome/ShowFilmHome';
import PromotionList from './../../Layout/PromotionList/PromotionList';

const Home:React.FC = () => {
    const allMovie= useSelector((state:RootState)=>state.storeMovieCityCinemaManage.allMovie)
    const resultApiAllMovie= useSelector((state:RootState)=>state.storeMovieCityCinemaManage.resultApiAllMovie)
    return (
        <div className='home'>
            {
                resultApiAllMovie==2 ? 
                    <ErrorServer/>
                :
                <>
                    <SliderShow movieShowing={allMovie.movieShowing}/>
                    <section className='xl:max-w-7xl md:mx-auto md:mb-0 mb-24'>
                        <div className='mx-4 sm:mx-8'>
                            <ShowFilmHome allMovie={allMovie}/>
                            <div className='mt-10'>
                                <h2 className='font-bold text-3xl md:inline-block mb-4 hidden relative 
                                before:absolute before:w-full before:h-1 before:bg-orange-500 before:-bottom-1'
                                >TIN KHUYẾN MÃI</h2>
                                <h2 className='font-semibold text-2xl md:hidden '>Tin khuyến mãi</h2>
                                <PromotionList/>
                            </div>
                        </div>
                    </section>
                    <NavBarMobile/>
                </> 
            }
        </div>
    );
}

export default Home;
