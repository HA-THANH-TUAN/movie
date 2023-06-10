import moment from "moment";
import 'moment/locale/vi';
interface IAction{
  type: string,
  payload: any
}
interface IAvailableDates {
  name:string,
  id:string,
  slug:string
}


interface IStateMovieDetailPage {

  loadingCalender :boolean,
  statusMovieDetailPage:boolean,
  resultApiCalenderMovieBySlug:number,
  today: string,
  movie:any
  filterResultCalenderMovie:any[],
  filter:{
    city:string,
    cinema:string,
    dateStart:string, 
    date: string,
  }
  availableDates: string[]
  availableCitys:IAvailableDates[] | []
  availableCinemas:any[] | []
}

const initialState:IStateMovieDetailPage = {
    loadingCalender :false,
    statusMovieDetailPage:true,
    resultApiCalenderMovieBySlug:0,
    today: moment().locale('vi').format("DD/MM/YYYY"),
    movie:{},
    filter:{
      city:"",
      cinema:"",
      dateStart:"",
      date:""
    },
    filterResultCalenderMovie:[],
    availableDates:[],
    availableCitys:[],
    availableCinemas:[],

}

const handleFilterListDateAvailable =( calenderMovie: any[],cityId:string, cinemaId:string):any=>{
  const allListDate:any=calenderMovie.filter(movie=>cityId?cityId==movie.cityId:true)
  .filter(movie=>cinemaId?cinemaId==movie.id:true)
  .reduce((listDate, inforCinema)=>{
    const listDateItem= inforCinema.listDate.filter((value:string) => {
      if(listDate.includes(value)){
        return false
      }
      else{
        return true
      }
    })
    return [...listDate, ...listDateItem]
  },[])
  .sort((a:string, b:string) => {
    const prev:number=Number(a.split("/").reverse().join(","))
    const curr:number=Number(b.split("/").reverse().join(","))
    return prev-curr
  })
  return allListDate
}

export default (state = initialState, { type, payload }:IAction):IStateMovieDetailPage => {
  switch (type) {
    case  "SET_DATA/loadingCalenderMovieDetailPage":
    return {...state,loadingCalender:payload}
    case  "SET_DATA/statusMovieDetailPage":
    return {...state,statusMovieDetailPage:payload}
    case  "SET_DATA/MovieInfor":
    return {...state,movie:payload}
    case  "SET_DATA/ResultCalenderMovieBySlug":
    return {...state,resultApiCalenderMovieBySlug:payload}
    case  "SET_DATA/ResetResultCalenderMovieBySlug":
    return {...state,resultApiCalenderMovieBySlug:payload}

    case  "SET_DATA/MovieDetailBySlug":
    return {...state,...payload}

    case  "SET_DATA/FilterDate":
    return {...state,filter:{...state.filter, date: payload}}

    case  "SET_DATA/FilterCity":
      const listDateCity=handleFilterListDateAvailable(state.filterResultCalenderMovie,payload,"")
      if(listDateCity.includes(state.filter.date)){
        return {...state, availableDates:listDateCity,filter:{...state.filter,city:payload, cinema: ""}}
      }
      else{
        return {...state,availableDates:listDateCity, filter:{...state.filter, city: payload,cinema:"", date:listDateCity[0]}}
      }
      
      case  "SET_DATA/FilterCinema":
        const listDate=handleFilterListDateAvailable(state.filterResultCalenderMovie, state.filter.city,payload)
      if(listDate.includes(state.filter.date)){
        return {...state,availableDates:listDate, filter:{...state.filter, cinema: payload}}
      }
      else{
        return {...state,availableDates:listDate, filter:{...state.filter, cinema: payload, date:listDate[0]}}
      }
    case  "SET_DATA/FilterDateStart":
    return {...state,filter:{...state.filter, dateStart: payload}}
    case  "SET_DATA/ResetDataMovieDetailPage":
    return initialState

    default:
      return state
    }
}
