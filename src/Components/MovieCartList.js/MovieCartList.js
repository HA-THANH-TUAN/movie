import React from 'react';
import MovieCart from './MovieCart/MovieCart';
import "./MovieCartList.scss"
import img23 from "../../assets/images/2_3.png"
import img32 from "../../assets/images/3_2.png"
import SkeletonMovieCart from './MovieCart/SkeletonMovieCart/SkeletonMovieCart';


const MovieCartList = (props) => {
    const {movieCartList }=props
    let indexEnd = 6;
    if(props.full){
        indexEnd=movieCartList.length
    }
    return (
            <div className='movie-cart-list-animation grid grid-cols-12 gap-5 md:gap-7 lg:gap-7 xl:gap-10'>

                {
                    movieCartList.length==0 ?[...Array(props.full ? 12 : indexEnd  )].map((v,i)=>
                    <SkeletonMovieCart key={i} isHome={props.isHome}/>
                    ):
                    movieCartList.slice(0, indexEnd).map((movie, i)=>
                    <div key={i} className={`col-span-6 sm:col-span-4 md:col-span-4 ${props.isHome ? "lg:col-span-4" : "lg:col-span-3"}`}>
                        <MovieCart isHome={props.isHome} movieCart={movie}/>
                    </div>)
                }
                {
               }
            </div>
    );
}

export default MovieCartList;
