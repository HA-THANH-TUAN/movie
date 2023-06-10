import fetchData from "./fetchDataGet"
const movieApi={
   getAllMovie:()=>{
      const data="cinema/nowAndSoon"
      return fetchData(data)
   },

   getAllCinema:()=>{
      const data="cinema/cinemas"
      return fetchData(data)
   },
   getAllCity:()=>{
      const data="cinema/city"
      return fetchData(data)
   },

   getAllMovieOfCinema:(code:string)=>{
      const data=`cinema/cinemas/${code}`
      return fetchData(data)
   },
   getMovieInforBySlug:(slug:string)=>{
      const data=`cinema/movieBySlug/${slug}`
      return fetchData(data)
   },
   getMovieInforById:(id:string)=>{
      const data=`cinema/movieById/${id}`
      return fetchData(data)
   },
   getMovieCalenderId:(id:string)=>{
      const data=`cinema/movie/${id}`
      return fetchData(data)
   },
}

export default movieApi