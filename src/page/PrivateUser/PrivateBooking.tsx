import React, {FC} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

interface IPrivateBooking {
  children :React.ReactNode | React.ReactNode[]
}
 const PrivateBooking:FC<IPrivateBooking> =({children})=> {
  const checkLogin = sessionStorage.getItem("isLogin")==="true" && sessionStorage.getItem("Name")
  const nav=useNavigate()
  const dispatch=useDispatch()
  const renderHeader = useSelector((state:RootState)=>state.authenticationManage.renderHeader)
  if(!checkLogin){
    dispatch({type:"SET_DATA/AuthenPopUpON"})
  }
  return (
    <div>
      {checkLogin ? children : <div className='h-[80vh] flex flex-col items-center justify-center' >
        <h1 className=' text-2xl mb-10 font-bold'>Bạn cần đăng nhập</h1>
        <button onClick={()=>{ dispatch({type:"SET_DATA/AuthenPopUpON"})}} className='rounded py-2 hover:cursor-pointer hover:opacity-80 bg-orange-500 px-2 text-white font-semibold'> Đăng nhập</button>
      </div>}
    </div>
  )
}

export default PrivateBooking