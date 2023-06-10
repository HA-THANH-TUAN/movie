
import { all, call, cancel, put, retry, takeEvery } from "redux-saga/effects"
import movieApi from "../../api/movieApi"
import bookingApi from "../../api/bookingApi"

function * handleGetDataCitysAndCinemas (){
    try{
        const dataCinemas= yield call(movieApi.getAllCinema)
        const dataCitys= yield call(movieApi.getAllCity)
        const cityIds=dataCinemas.reduce((prev, curr) =>{ if(!prev.includes(curr.cityId)) return [...prev, curr.cityId] ;else return prev}, [])
        const dataCitysAvailable = dataCitys.reduce((prev, curr) => { 
            if(cityIds.includes(curr.id)){
                const {id, name, slug}=curr
                return [...prev, {id,name, slug} ]
            }
            else return prev
        }, [])
        const result={
            citys:dataCitysAvailable,
            cinemas:dataCinemas.sort((a, b) => a.order - b.order)
        }
        yield put({type:"SET_DATA/ResultApiCityAndCinema", payload: 1})
        yield put({type:"SET_DATA/CityAndCinema", payload: result})
    }
    catch(error){
        yield put({type:"SET_DATA/ResultApiCityAndCinema", payload: 2})
    }
}

function * handleGetDataStoreMovie (){
    try {
        const result= yield retry(2,0,movieApi.getAllMovie)
        yield put({type:"SET_DATA/ResultApiAllMovie", payload:1})
        yield put({type:"SET_DATA/AllMovie", payload:result})
    } catch (error) {
        yield put({type:"SET_DATA/ResultApiAllMovie", payload:2})
    }
}

function * handleGetDataMovieInforById ({payload}){
    try {
        const dataMovieInfor= yield call(movieApi.getMovieInforById, payload)
        yield put({type:"SET_DATA/MovieInfor", payload:dataMovieInfor})
    } catch (error){
        yield put({type: "SET_DATA/statusMovieDetailPage", payload:false})  
    }
}
function * handleGetDataMovieInforBySlug ({payload}){
    try {
        const dataMovieInfor= yield call(movieApi.getMovieInforBySlug, payload)
        yield put({type:"SET_DATA/MovieInfor", payload:dataMovieInfor})
    } catch (error){        
        yield put({type: "SET_DATA/statusMovieDetailPage", payload:false})  
    }
}

function * handleGetDataCalenderMovie ({payload:{idMovie, dataCitysAndCinemas}}){
    yield put({type:"SET_DATA/loadingCalenderMovieDetailPage", payload: false})
    try {
        const dataMovieDetail= yield call (movieApi.getMovieCalenderId, idMovie)
        const availableCityIds= dataMovieDetail.reduce((prevCinemaMovie, currCinemaMovie) => {
            if(prevCinemaMovie.includes(currCinemaMovie.cityId))return prevCinemaMovie;
           else return [...prevCinemaMovie, currCinemaMovie.cityId]
        }, [])
        
        const availableCitys=dataCitysAndCinemas.citys.filter((city) => availableCityIds.includes(city.id))
        const availableCinemaIds= dataMovieDetail.reduce((prevCinemaMovie, currCinemaMovie) => {
            if(prevCinemaMovie.includes(currCinemaMovie.id))return prevCinemaMovie;
            else return [...prevCinemaMovie, currCinemaMovie.id]
        }, [])
        
        const calenderMovie=dataMovieDetail.reduce((prevMovie, currMovie ) => {
            const listDate=currMovie.dates.reduce((listDateItem, currDates)=>{
                if(listDateItem.includes(currDates.showDate))return listDateItem
                else return [...listDateItem, currDates.showDate ]
            },[])
            return [...prevMovie, {...currMovie, listDate}]
        }, [])
        
        const listDateUnique = calenderMovie.reduce((prevListDateUnique, currMovie)=>{
            const dateList= currMovie.listDate.filter((date) => !prevListDateUnique.includes(date))
            return [...prevListDateUnique, ...dateList]
        },[])
        
        const availableDates=listDateUnique.sort((a, b) => {
            const aStringYYYYDDMM=a.split("/").reverse().join("")
            const bStringYYYYDDMM=b.split("/").reverse().join("")
            return aStringYYYYDDMM-bStringYYYYDDMM 
        })
        const availableCinemas=dataCitysAndCinemas.cinemas.filter((cinema) => availableCinemaIds.includes(cinema.id))
        
        yield put ({type:"SET_DATA/MovieDetailBySlug",payload:{availableCinemas,availableCitys,filterResultCalenderMovie:calenderMovie,availableDates , ...dataMovieDetail}})
        yield put ({type:"SET_DATA/ResultCalenderMovieBySlug",payload:1})
        yield put ({type:"SET_DATA/FilterDateStart",payload:availableDates[0]})
        yield put ({type:"SET_DATA/FilterDate",payload:availableDates[0]})
        
    } catch (error) {
        yield put({type: "SET_DATA/statusMovieDetailPage", payload:false})
    }
    finally{
        yield put({type:"SET_DATA/loadingCalenderMovieDetailPage", payload: true})
    }
}





function* handleFindMovieBooking ({id, cinemaId, sessionId, slug}) {
    const movieInfor = yield call(movieApi.getMovieInforBySlug, slug);
    const dataSentRedux={}
    const movieCinemaInfor = yield call(movieApi.getMovieCalenderId, movieInfor.id);
    if(movieCinemaInfor.length==0) throw new Error('This is an intentional error.')
    else{
        const cinemaForMovie=movieCinemaInfor.find((cinema, index) =>cinema.id==id)
        cinemaForMovie.dates.find((date) => {
          return date.bundles.find((bundle, i)=>{
              return  bundle.sessions.find((session)=>{
              if(session.id==`${cinemaId}-${sessionId}`){
                dataSentRedux["ShowCode"]=session.id
                dataSentRedux["FilmName"]=movieInfor.name
                dataSentRedux["dayOfWeekLabel"]=session.dayOfWeekLabel
                dataSentRedux["CinemaName"]=cinemaForMovie.name
                dataSentRedux["TheaterName"]=session.screenName
                dataSentRedux["ShowTime"]=session.showTime
                dataSentRedux["ShowDate"]=session.showDate
                dataSentRedux["ImageLandscape"]=movieInfor.imageLandscape
                dataSentRedux["ImagePortrait"]=movieInfor.imagePortrait
                return true
              }
            })
          })
        })
        if(Object.keys(dataSentRedux).length===0){throw new Error('This is an intentional error.')}
    }
    return dataSentRedux
  }

function * handleDataAllDataBooking({cinemaId,sessionId}){

    const data=yield call(bookingApi.getBookingDetail)
    const dataSeatBooked=yield call(bookingApi.getSeatBooked,cinemaId,sessionId)
    const flatArraySeats=dataSeatBooked.map(seats=>seats.SeatCode.replace(/\s/g,'')).join(",").split(",")
    const dataBookingCombo=data.consession[0].concessionItems.reduce((previousValue, currentValue) => {
        const {id ,description,imageUrl,displayPrice,extendedDescription}=currentValue
        return {...previousValue, [id]:{id ,description,extendedDescription,imageUrl,displayPrice, number:0}}
    }, {})
    const dataBookingSeat=data.ticket.reduce((previousValue, currentValue) => {
        const {name, description, displayPrice,areaCategoryCode, onlyMember}=currentValue; 
        return {...previousValue, [`${areaCategoryCode}${onlyMember}`]: {name, description, displayPrice,areaCategoryCode, onlyMember, seatsNameChoosed:[]}}
    }, {})
    return {
        dataSeatCinema:data.seatPlan,
        dataBookingSeat,
        dataBookingCombo,
        dataSeatBooked:flatArraySeats
    }
}


function*handleGetDataAllBooking({payload}){

    yield put({
        type:"SET_DATA/loadingStart"
    })
    const data= yield call(handleDataAllDataBooking, payload)
    yield put({
        type:"SET_DATA/allDataBooking",
        payload: data
    })
    yield put({
        type:"SET_DATA/loadingEnd"
    })
}

function * handleGetDataAllBookingPage ({type,payload}){
    
    yield put({
        type:"SET_DATA/loadingStart"
    })
    try {
        const inforMovieBooking= yield call(handleFindMovieBooking,payload)
        yield put({type:"SET_DATA/inforMovieBooking", payload:inforMovieBooking})
        const data= yield call(handleDataAllDataBooking, payload)
        yield put({type:"SET_DATA/allDataBooking",payload: data})
    } catch (error) {
        
        yield put({
            type:"SET_DATA/errorMovieDetailPage"
        })
    }
    finally{
        yield put({
            type:"SET_DATA/loadingEnd"
        })
        
    }
}

function * getAllMovie(){
    yield takeEvery("GET_DATA/AllMovie", handleGetDataStoreMovie)
}

function * getAllCinemaAndCity(){
    yield takeEvery("GET_DATA/CityAndCinema", handleGetDataCitysAndCinemas)
}

function * getCalenderMovie(){
    let task=yield takeEvery("GET_DATA/MovieCalender", handleGetDataCalenderMovie)
    takeEvery("CANCLE_GET_DATA/MovieCalender",function*(){
       yield cancel(task)
       task=yield takeEvery("GET_DATA/MovieCalender", handleGetDataCalenderMovie)
    })
}

function * getAllBooking(){
    yield takeEvery("GET_DATA/AllDataBooking", handleGetDataAllBooking)
}

function * getAllBookingPage(){
    yield takeEvery("GET_DATA/AllDataBookingPage", handleGetDataAllBookingPage)
}

function * getMovieInforById(){
    yield takeEvery("GET_DATA/MovieInforById", handleGetDataMovieInforById)
}

function * getMovieInforBySlug(){
    yield takeEvery("GET_DATA/MovieInforBySlug", handleGetDataMovieInforBySlug)
}

function*middleReSa(){
    yield all([getAllBooking(), getMovieInforById(),getCalenderMovie(),getAllBookingPage(), getMovieInforBySlug(), getAllCinemaAndCity(), getAllMovie()])
}

export default middleReSa
