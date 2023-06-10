import React, { useState , FC, useEffect} from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function Authentication() {
  const stateModalAuthen= useSelector((state:RootState)=>state.modalPopUpManage.authenPopUp)
  const [authen, setAuthen] = useState(0)
  const dispatch = useDispatch()


  return (
    <div className=''>
        { stateModalAuthen &&<div className='modal-popup z-[999]'>
          <div className='modal-popup-dialog'>
            <div className='modal-popup-wrapper' onClick={()=>{dispatch({type:"SET_DATA/AuthenPopUpOFF" , payload: false})}}>
            </div>
            <div className='modal-popup-content basis-full mx-7' 
            >
              {
                authen===1 ? <Register handleChangeLogin={()=>setAuthen(0)} /> : <Login handleChangeRegister={()=>setAuthen((1))}/>
              }
            </div>
          </div>
        </div> }
    </div>
  )
}
