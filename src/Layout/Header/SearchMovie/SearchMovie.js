import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { useSelector } from 'react-redux';
import "./SearchMovie.scss"
import { useNavigate , Link} from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';

const SearchMovie = (props) => {
    const nav=useNavigate()
    const [inputSearch, setInputSearch]=useState("")
    const arrayAllMovie= useSelector((state)=>{
        const {movieShowing,movieCommingSoon}=state.storeMovieCityCinemaManage.allMovie
        return [...movieShowing,...movieCommingSoon]
    })

    let resultFilter=[]
    if(arrayAllMovie.length){
        resultFilter=arrayAllMovie.filter((movie)=> inputSearch?movie.name.match(new RegExp(inputSearch, "gi")):false).slice(0,6)
    }
    return (
            <div className='search-movie relative flex items-center flex-1 xl:max-w-[700px] bg-white border-solid border border-zinc-300 px-1 py-1 rounded '>
                <div className='flex items-center flex-1 bg-white border-solid border border-zinc-300 px-1 py-1 rounded '>
                    <span className='px-1 text-base'><GoSearch/></span>
                    <input onFocus={()=>{props.setFocusSearch(true)}}
                        onBlur={()=>{setTimeout(()=>{props.setFocusSearch(false)} , 300)}}
                        onChange={(e)=>{setInputSearch(e.target.value)}}
                        className='focus:outline-none flex-1 py-1 ml-2 w-[10px] inline-block' type="search" value={inputSearch} placeholder='Tìm kiếm phim ... '/>
                </div>
                    
                {props.focusSearch&&<div className='area-result absolute z-50 top-full w-full right-0 bg-slate-200 max-h-[500px] overflow-y-auto'>
                    <ul className='even:border border-solid border-emerald-600'>

                        {
                            arrayAllMovie.length==0 ? 
                                <p className='bg-white text-center py-2'>
                                    <Spinner
                                    diameter={30}
                                    weight={4}
                                    color={"#ff7b00"}
                                    bg={"inherit"}
                                    />
                                </p>
                            :

                            resultFilter.map((movie,i)=><li onClick={()=>{nav(`/dat-ve/${movie.slug}`) ; setInputSearch(""); props.setFocusSearch(false)}} 
                                className='result-item flex p-2 hover:bg-zinc-300' key={i}>
                                    <img className='w-20 ' src={movie.imageLandscape} alt=""/>
                                    <p className='truncate ml-3 font-medium'>{movie.name}</p>
                                </li>)
                            
                        }
                    </ul>
                    
                </div>}
            </div>
    );
}

export default SearchMovie;
