import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/galaxy-logo.png";
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { RiErrorWarningLine } from "react-icons/ri"

import './Login.scss';

import { useDispatch, useSelector } from 'react-redux';
import {handleCheckEmty, handleCheckFormatPatern } from '../handleErrorForm';
import PopUpNotify from '../../../Components/PopUpNotify/PopUpNotify';


const Login = ({handleChangeRegister}) => {


    const [notifyErrorLogin, setNotifyErrorLogin]= useState({message:""})

    const [messageError,setMessageError] = useState({
        password:"",
        email:"",
    })

    
    const emailJustRegister = useSelector((state)=>state.authenticationManage.emailJustRegister)
    const dispatch= useDispatch()
    const [sightPassword, setSightPassword] = useState(true)
    const [email, setEmail] = useState(emailJustRegister)
    const [password, setPassword] = useState('')

    const handleCheckEmail=()=>{
        const checkPattern= handleCheckFormatPatern(email,/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        const checkEmty= handleCheckEmty(email)
        if(checkEmty){
            return {
                status: false,
                message:{email:"Hãy nhập email"}
            }
        }
        else if(!checkPattern){
            return {
                status: false,
                message:{email:"Email không đúng"}
            }
        }
      
        return {
            status: true,
            message:{email:""}
        }
    }

    const handleResetError = (name)=>{
        if(messageError[name]!==""){
            setMessageError({...messageError, [name]:""})
        }
    }
    
    const handleCheckPassword=()=>{
        const checkEmty= handleCheckEmty(password)
        if(checkEmty){
            return {
                status: false,
                message:{password:"Hãy nhập mật khẩu"}
            }
        }
        return {
            status: true,
            message:{password:""}
        }
    }


    useEffect(()=>{dispatch({type: "SET_DATA/EmailJustRegister", payload: ""})})
    
    useEffect(()=>{
        document.body.style.overflowY="hidden"
        return ()=>{
            document.body.style.overflowY="initial"
        }
    },[])
    const handleSubmit = () => {
        const checkE= handleCheckEmail()
        const checkP= handleCheckPassword()
        setMessageError({...checkE.message, ...checkP.message})
       
        if(checkE.status&checkP.status){
            fetch('https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/user/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Email": email,
                "Password": password
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else if(res.status === 404) {
                }
            })
            .then (data=>{
                if(data){
                    sessionStorage.setItem("Name", data.Name);
                    sessionStorage.setItem("Email", data.Email);
                    sessionStorage.setItem("isLogin", true);
                    dispatch({type: "SET_DATA/ReRenderHeader"});
                    dispatch({type: "SET_DATA/AuthenPopUpOFF"});
                }
                else{
                    setNotifyErrorLogin({message: "Đăng nhập thất bại ! "})
                }
            })
        }
    }
    return (
     
                <div className="form max-w-md mx-auto  rounded-md shadow-form relative p-5 bg-white pointer-events-auto">
                    {notifyErrorLogin.message=="" ? undefined : <PopUpNotify children={<RiErrorWarningLine/>} handleOffPopUp={()=>setNotifyErrorLogin({message:""})} message={notifyErrorLogin.message}/>}
                    <button onClick={()=>{dispatch({type:"SET_DATA/AuthenPopUpOFF" , payload: false})}}
                    className="absolute -right-4 -top-4 w-8 h-8 flex justify-center items-center rounded-[50%] bg-white font-medium hover:text-white text-2xl hover:bg-orange-500">
                        <MdClose />
                    </button>
                    <Link to="/" ><img className='w-[360px] m-auto py-5' src={logo} alt="logo" /></Link>
                    <div className='text-sm text-center mb-3 sm:block hidden '>
                        Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm nhiều ưu đãi 
                        từ chương trình thành viên Galaxy Cinema.
                    </div>
                    <div className="mt-3 bg-inherit">
                        <form className="formLogin bg-inherit">
                            <div className='bg-inherit mb-6' >
                                <input
                                    className={` h-11 rounded-md px-3 truncate border-solid focus:outline-none border w-full ${messageError.email ? "border-red-500":"border-blue-500"} `}
                                    value={email}
                                    name="email"
                                    type='email'
                                    placeholder="Email" 
                                    onChange={(e) => {setEmail(e.target.value); handleResetError(e.target.name)}}
                                />
                                { messageError.email && <p className='mb-[8px] text-[14px] text-red-600 flex items-center ml-3 '><span className='mr-1'>{<MdError/>}</span><span>{messageError.email} !</span></p>}


                            </div>
                            <div className='relative'>
                                <input
                                    className={`my-2 h-11 rounded-md px-3 truncate border-solid focus:outline-none border w-full ${messageError.password ? "border-red-500":"border-blue-500"} `}
                                    value={password}
                                    name="password"
                                    type={sightPassword ?"password":"text"}
                                    placeholder="Mật khẩu" 
                                    onChange={(e) => {setPassword(e.target.value);handleResetError(e.target.name)}}
                                    />
                                { messageError.password && <p className='mb-[8px] text-[14px] text-red-600 flex items-center ml-3 '><span className='mr-1'>{<MdError/>}</span><span>{messageError.password} !</span></p>}
                                <span className={`${password==="" ? "hidden":"flex"} text-2xl absolute flex justify-center items-center w-8 h-8 top-4 right-2 `} onClick={()=>setSightPassword((state)=>(!state))}> {sightPassword ? <AiOutlineEye/>: <AiOutlineEyeInvisible/>}</span>

                            </div>
                            <div >
                                <div className='text-orange-500 text-right mt-2 font-medium cursor-pointer hover:opacity-70'> Quên mật khẩu ?</div>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button type="button" onClick={handleSubmit} className='bg-orange-500 text-white font-medium p-3 rounded text-md hover:bg-orange-400'>Đăng nhập</button>
                            </div>
                            <div className='text-center mt-7' >
                                Bạn chưa có tài khoản?
                                <span className='text-orange-500 hover:opacity-90 text-center cursor-pointer font-medium' onClick={handleChangeRegister} > Đăng kí</span>
                            </div>
                        </form>
                    </div>
                </div>
    )
}

export default Login
