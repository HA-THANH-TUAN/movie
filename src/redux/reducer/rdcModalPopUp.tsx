
interface IStateModalPopUp {
  authenPopUp: boolean,
}

const initialState : IStateModalPopUp = {
    authenPopUp: false,
}

export default (state = initialState, { type, payload}:{type:string, payload?: boolean}) => {
  switch (type) {

  case "SET_DATA/AuthenPopUpON":
    return { ...state, authenPopUp:true }
    
    case "SET_DATA/AuthenPopUpOFF":
    return { ...state, authenPopUp:false }

  default:
    return state
  }
}
