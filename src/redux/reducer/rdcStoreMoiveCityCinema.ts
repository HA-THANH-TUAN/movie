// 0: yet call // 1: Oke // 2: Fail

import { ICinema } from "../../models/cinema"

interface IState {
  resultApiAllMovie:number,
  resultApiCityAndCinema:number,
  citys:any[],
  cinemas:ICinema[]|[],
  allMovie:{
    movieCommingSoon:any[],
    movieShowing:any[],
  },

}
interface IAction{
  type: string,
  payload: any
}

const initialState:IState = {
    resultApiAllMovie:0,
    resultApiCityAndCinema:0,
    citys:[],
    cinemas:[],
    allMovie:{
      movieCommingSoon:[],
      movieShowing:[]
    }
}

export default (state = initialState, { type, payload }:IAction):IState => {
  switch (type) {

  case "SET_DATA/AllMovie":
      return  { ...state,allMovie:{...state.allMovie, ...payload}}

  case "SET_DATA/ResultApiAllMovie":
    return  { ...state,resultApiAllMovie:payload }
  
    case "SET_DATA/CityAndCinema":  
    return { ...state, ...payload }

    case "SET_DATA/ResultApiCityAndCinema":
      return  { ...state,resultApiCityAndCinema:payload }
    
  default:
    return state
  }
}
