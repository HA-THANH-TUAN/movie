import React, {FC,useEffect} from 'react';
import {HiArrowNarrowLeft} from "react-icons/hi"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {FiMapPin} from "react-icons/fi"
import logo from "../../assets/images/logoX.png"


interface IFilterMovieDetail {
    slugMovie:string,
    idMovie:string
}
const FilterMovieDetail:FC<IFilterMovieDetail>= ({ slugMovie, idMovie}) => {
    const dispatch= useDispatch()
    const filter=useSelector((state:RootState)=>state.movieDetailPageManage.filter)
    const availableCinemas = useSelector((state:RootState)=>state.movieDetailPageManage.availableCinemas)
    const availableCitys = useSelector((state:RootState)=>state.movieDetailPageManage.availableCitys)
    const citys=useSelector((state:RootState)=>state.storeMovieCityCinemaManage.citys)
    const cinemas=useSelector((state:RootState)=>state.storeMovieCityCinemaManage.cinemas)
    const loadingCalender=useSelector((state:RootState)=>state.movieDetailPageManage.loadingCalender)
    useEffect(()=>{
        if((slugMovie&&citys.length&&cinemas.length)){       
            dispatch({
                type:"GET_DATA/MovieCalender",
                payload:{idMovie, dataCitysAndCinemas:{
                    citys,cinemas
                }}
            })
        }
    },[slugMovie,citys.length,cinemas.length])

    const handleFilterCity=(cityId:(string | undefined))=>{
        dispatch({type:"SET_DATA/FilterCity", payload:cityId});
    }

    const handleFilterCinema=(cinemaId:(string | undefined))=>{
        dispatch({type:"SET_DATA/FilterCinema", payload:cinemaId})
    }
    return (
            <div className='flex-col sm:flex-row flex mx-5 lg:mx-24 '>
                {
                    loadingCalender?
                    <>
                        <div className='flex-1 mx-2'>
                            <div className={`px-2 rounded-md flex items-center border-solid border-zinc-500 ${availableCitys.length==0?"bg-zinc-200":"border"}`}>
                                <FiMapPin className='text-2xl text-orange-500'/>
                                <select
                                    disabled={availableCitys.length==0}
                                    className={`border-none rounded-lg focus:outline-none text-lg py-2 px-2 bg-inherit w-full`}
                                    onChange={(e)=>handleFilterCity(e.target.value)}
                                    value={filter.city}>
                                    <option value="" >Toàn quốc</option>
                                    {
                                        availableCitys.length ? 
                                        availableCitys.map((value) => <option value={value.id} key={value.id}>{value.name}</option>)
                                        :"Loading ..."
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='flex-1 mx-2 mt-3 sm:mt-0'>
                           <div className={`px-2 rounded-md flex items-center border-solid border-zinc-500 ${availableCinemas.length==0?"bg-zinc-200":"border"}`}>
                                <label><img className='w-6' src={logo} alt="" /></label>
                                <select 
                                    className='border-none rounded-lg focus:outline-none text-lg py-2 bg-inherit px-2 w-full'
                                    onChange={(e)=>handleFilterCinema(e.target.value)}
                                    disabled={availableCinemas.length==0}
                                    value={filter.cinema}>
                                    <option value="">Tất cả rạp</option>
                                    {
                                        availableCinemas.length!==0&& 
                                        availableCinemas.filter(value=>filter.city ==="" ? true : filter.city===value.cityId).map((value) => <option value={value.id} key={value.id}>{value.name}</option>)
                                    }
                                </select>
                           </div>
                        </div>
                    </>:
                    <>
                        <div className='flex-1'>
                            <div className='px-3 pb-5'>
                                <p className='h-12 rounded-lg seleton-image bg-zinc-300'></p>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='px-3 pb-5'>
                                <p className='h-12 rounded-lg seleton-image bg-zinc-300'></p>
                            </div>
                        </div>
                    </>
                }
               
            </div>
            
    );
}

export default FilterMovieDetail;
