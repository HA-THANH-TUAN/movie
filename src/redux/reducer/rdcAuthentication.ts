interface IStateAuthentication {
  renderHeader:boolean
  emailJustRegister:string,
  email?: string
}

const initialState:IStateAuthentication = {
  renderHeader:true,
  emailJustRegister:"",
}


export default (state = initialState, { type, payload}:{type:string, payload: any}) => {
  switch (type) {
    

  case "SET_DATA/ReRenderHeader":
    return { ...state, renderHeader: !state.renderHeader }
  case "SET_DATA/EmailJustRegister":
    return { ...state, emailJustRegister:payload }
  default:
    return state
  }
}
