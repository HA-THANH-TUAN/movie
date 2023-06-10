import { AiFillLike } from "react-icons/ai";
import { BsClockHistory } from 'react-icons/bs';
import { BsFillPlayCircleFill } from 'react-icons/bs'
import moment from 'moment';
const CartDetailMovie = ({movie,handleOnTrailerPopUp}) => {
    return (
        <div className='relative ' 
        style={{backgroundImage:`url(${movie.imageLandscapeMobile})`,backgroundRepeat:"no-repeat",backgroundSize: "cover"}}>
            <div style={{backgroundImage:"linear-gradient(to right,rgba(0,0,0,1)150px,rgba(0,0,0,.6)100%)"}} className=''>
                <div className=' xl:max-w-7xl grid grid-cols-12 gap-x-4 lg:mx-auto mx-2 py-5 lg:py-16'>
                    <div className='image-portrait col-span-12 md:col-span-3 relative flex justify-center items-center'>
                        <img className='mx-5 md:mx-0 sm:w-[160px] md:w-auto  rounded-md' src={movie.imagePortrait} alt="imageMovie" />
                        <button onClick={()=>handleOnTrailerPopUp()} className="absolute border boder-solid border-orange-500 p-1.5 md:p-3 rounded-xl bg-black opacity-80 hover:bg-orange-500">
                            <BsFillPlayCircleFill className='text-5xl text-white hover:scale-125 ' />
                        </button>
                    </div>
                    <section className='text-white mx-5 md:mx-0 col-span-12 md:col-span-9'>
                        <h2 className='text-xl mt-2 md:text-3xl text-center md:text-start font-medium mb-3'>{movie.name}</h2>
                        <h3></h3>
                        <div className='flex items-center mb-3 '>
                            {
                                movie.age&&movie.age!=0&&<span className={`${movie.age==18?"bg-red-500":movie.age==16?"bg-yellow-500":movie.age==13?"bg-blue-500":"bg-green-600" } mr-3 my-1 text-white font-medium flex justify-center items-center rounded w-12 h-7`}>{`${Number(movie.age)?`C${movie.age}`:`${movie.age.toUpperCase()}`}`}</span>
                            }
                            {movie.duration && <p className='flex items-center text-sm md:text-lg'><span className='mr-2 ml-2 text-sm md:text-lg'><BsClockHistory /></span> {movie.duration} phút</p>}
                        </div>
                        <ul className=''>
                            <li className='mt-1 text-lg md:text-xl'><span className='text-zinc-400 font-semibold '>Ngày khởi chiếu: </span><span>{moment(movie.startdate).format("DD/MM/YYYY")}</span></li>
                        </ul>
                        <section className='mt-5'>
                            <h2 className="font-semibold text-lg md:text-xl mb-3"><span className="inline-block border-orange-500">Nội dung</span></h2>
                            <div className='text-sm md:text-lg'>
                                {
                                 <p className='text-white' dangerouslySetInnerHTML={{ __html: movie.description.replace(/color\:[\W\w]+?\"/, "color:white").replace(/background\:[\W\w]+?\"/g, "").replace(/font-size\:[\W\w]+?\"/g, "font-size:16px") }}></p>
                                 
                                }
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div >
    );
}

export default CartDetailMovie;