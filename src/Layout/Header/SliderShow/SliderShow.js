import React, {useRef, useState} from 'react';
import "./SliderShow.scss"
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri"
import BookingFast from '../BookingFast/BookingFast';
import { connect } from 'react-redux';
const SliderShow = ({ storeMovie }) => {
    const [sliderPres, setsliderPres] = useState(0)
    const ulElement = useRef()
    const dataImages = [
        "/media/2023/3/9/demon-slayer-1_1678344786362.jpg",
        "/media/2023/3/13/913x391-1_1678679211096.jpg",
        "/media/2023/3/9/913wx391h_1678335156016.jpg",
        "/media/2023/3/14/913wx391h_1678764838944.jpg",
        "/media/2023/2/10/221007103508-the-super-mario-bros-movie-mario-4-daeaa_1675998973650.jpg",
    ]
    const handleOnClick = () => {
        if (sliderPres < dataImages.length - 1) {
            setsliderPres(sliderPres + 1)
        }
        else {
            setsliderPres(0)
        }
    }
    const handleOnClickPre = () => {
        if (sliderPres > 0) {
            setsliderPres(sliderPres - 1)
        }
        else {
            setsliderPres(dataImages.length - 1)
        }
    }

    return (
        <div className='slidershow'>
            <div className='wraper-slider relative'>
                <ul className='flex overflow-hidden ' ref={ulElement}>
                    {storeMovie.movieShowing
                        && storeMovie.movieShowing
                            .slice(0, 6)
                            .map((v, i) => <li style={{ transform: `translateX(-${sliderPres * ulElement.current?.offsetWidth}px)` }} key={i} className="w-full basis-full shrink-0 grow-0 transition-transform duration-300 ease-in-out"><img className='object-cover bg-origin-padding w-full mx-auto' src={v.imageLandscapeMobile}/></li>)}
                </ul>
                <div className='absolute flex justify-center w-full bottom-2'>
                    {dataImages.map((v, i) => <p onClick={() => setsliderPres(i)} style={{ backgroundColor: i === sliderPres ? "orange" : "whitesmoke" }} key={i} className={`${i === sliderPres ? "w-8" : "w-6"} h-2 cursor-pointer mx-2 rounded-md`}></p>)}
                </div>
                <button type="button" onClick={handleOnClickPre} className=' py-3 arrow-direction hidden text-teal-100 top-1/3 left-0 absolute'><RiArrowDropLeftLine  className='btnArrow'/></button>
                <button type="button" onClick={handleOnClick} className=' py-3 arrow-direction hidden text-teal-100 top-1/3 right-0 absolute'><RiArrowDropRightLine  className='btnArrow' /></button>
            </div>
            {/* <BookingFast /> */}
        </div>
    );
}

const mapStateToProps = (state) => ({
    storeMovie: state.storeMovieManage
})

export default connect(mapStateToProps, undefined)(SliderShow)
