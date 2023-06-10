

interface dataBookingSeat {
  areaCategoryCode:string,
  description: string,
  displayPrice:number,
  name:string,
  onlyMember:boolean,
  seatsNameChoosed:string[]
}
export interface dataBookingCombo {
  description:string 
  displayPrice:number
  extendedDescription:string
  id: string,
  imageUrl: string,
  number:number
}

interface IStateBookingMoive {
  loading: boolean,
  statusPage: boolean,
  popUpVerify:boolean,
  processBooking:number,

  inforMovieBooking:{
    dayOfWeekLabel:undefined|string,
    age:undefined|string,
    CinemaName: undefined|string,
    TheaterName: undefined|string,
    FilmName: undefined|string,
    ImageLandscape: undefined|string,
    ImagePortrait: undefined|string,
    ShowTime: undefined|string,
    ShowDate:undefined|string,
  },
  dataSeatCinema:any[],
  dataSeatBooked:any[],
  dataBookingCombo:Record<string,dataBookingCombo>,
  dataBookingSeat:Record<string,dataBookingSeat>,
}

const initialState:IStateBookingMoive = {
    loading: false,
    statusPage: true,
    popUpVerify:true,
    processBooking:0,
    inforMovieBooking:{
      dayOfWeekLabel:undefined,
      age:undefined,
      CinemaName: undefined,
      TheaterName: undefined,
      FilmName: undefined,
      ImageLandscape: undefined,
      ImagePortrait: undefined,
      ShowTime: undefined,
      ShowDate:undefined,
    },
    dataSeatCinema:[],
    dataSeatBooked:[],
    dataBookingCombo:{},
    dataBookingSeat:{},

}

export default (state = initialState, { type, payload }:{type:string, payload:any}):IStateBookingMoive => {
  switch (type) {

  case "SET_DATA/allDataBooking":
    return { ...state, ...payload }

  case "SET_DATA/inforMovieBooking":
    return { ...state, inforMovieBooking:payload }

  case "SET_DATA/errorMovieDetailPage":
    return { ...state, statusPage: false}
  case "SET_DATA/loadingStart":
    return { ...state, loading: true}

  case "SET_DATA/loadingEnd":

    return { ...state, loading: false}
  case "SET_DATA/process":

    return { ...state, processBooking: payload}

  case "SET_DATA/comboDecrease":
    return {...state, dataBookingCombo:{...state.dataBookingCombo, [payload]:{...state.dataBookingCombo[payload], number:state.dataBookingCombo[payload].number+1} }}
    
  case "SET_DATA/resetCombo":
    return {...state, dataBookingCombo:{...state.dataBookingCombo, [payload]:{...state.dataBookingCombo[payload], number:0} }}
    
  case "SET_DATA/comboIncrease":
    if(state.dataBookingCombo[payload].number){
      return {...state, dataBookingCombo:{...state.dataBookingCombo, [payload]:{...state.dataBookingCombo[payload], number:state.dataBookingCombo[payload].number-1} }}
    }
    return state
  
  case "SET_DATA/chooseSeat":
    if(state.dataBookingSeat[payload.id].seatsNameChoosed.includes(payload.seatName)){
      const newSeats=[...state.dataBookingSeat[payload.id].seatsNameChoosed].filter(value=>value!=payload.seatName)
      return {...state, dataBookingSeat:{...state.dataBookingSeat, [payload.id]:{...state.dataBookingSeat[payload.id], seatsNameChoosed:newSeats}}}
    }
    else{
      const newSeats=[...state.dataBookingSeat[payload.id].seatsNameChoosed, payload.seatName]
      return {...state, dataBookingSeat:{...state.dataBookingSeat, [payload.id]:{...state.dataBookingSeat[payload.id], seatsNameChoosed:newSeats}}}
    }
  case "SET_DATA/ResetDataProcessBooking":
    return initialState

  default:
    return state
  }
}


