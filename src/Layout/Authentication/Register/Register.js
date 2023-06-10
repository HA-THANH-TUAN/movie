import React, { useState, useEffect } from 'react'
// import swal from "sweetalert";
import { MdClose } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleCheckEmty, handleCheckFormatPatern } from '../handleErrorForm';
import PopUpNotify from '../../../Components/PopUpNotify/PopUpNotify';

const Register = ({ handleChangeLogin }) => {
    const [notifyErrorRegister, setNotifyErrorRegister]= useState({message:""})
    const [stateCallApi, setStateCallApi]=useState(0)
    const dispatch=useDispatch()
    const nav=useNavigate()
    const [sightPassword, setSightPassword] = useState(true)
    const [sightVerifyPassword, setSightVerifyPassword] = useState(true)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setverifyPassword] = useState('');
    const [messageError,setMessageError] = useState({
        name:"",
        email:"",
        password:"",
        verifyPassword:""
    })
    
    useEffect(()=>{
        document.body.style.overflowY="hidden"
        return ()=>{
            handleChangeLogin()
            document.body.style.overflowY="initial"
        }
    },[])
    
    const handleFoucsInput=(e)=>{
        if(messageError[e.target.name]){
            setMessageError({...messageError, [e.target.name]:""})
        }
        
    }
    const handleCheckEmail=()=>{
        const checkEmty=  handleCheckEmty(email)
        const checkPattern= handleCheckFormatPatern(email,/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if(checkEmty){
            return {
                status:false,
                message:{email: "Hãy nhập email"}
            }
        }
        else if(!checkPattern){
            return {
                status:false,
                message:{email: "Email không đúng"}
            }
        }
        return {
            status:true,
            message:{email: ""}
        }
    }

    const handleCheckName=()=>{
        const checkEmty=  handleCheckEmty(name)
        const checkPattern= handleCheckFormatPatern(name, /^[A-Za-z\s]+$/)
        if(checkEmty){
            return {
                status:false,
                message:{name: "Hãy nhập tên của bạn"}
            }
        }
        else if(!checkPattern){
            return {
                status:false,
                message:{name: "Tên không được chứ ký tự đặt đặt biệt và số"}
            }
        }
        return {
            status:true,
            message:{name: ""}
        }
    }

    const handleCheckPassword=()=>{
        const checkEmty=  handleCheckEmty(password)
        const checkPattern= handleCheckFormatPatern(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        if(checkEmty){
            return {
                status:false,
                message:{password: "Hãy nhập mật khẩu của bạn"}
            }
        }
        else if(!checkPattern){
            return {
                status:false,
                message:{password: "Mật khẩu phải trên 8 ký tự và chứa ít nhất một chữ hoa, ít nhất một chữ thường, ít hơn một số, ít nhất một ký tự đặc biệt: @ $ ! % * ? &"}
            }
        }
        else if(password!==verifyPassword){
            return {
                status: false,
                message:{verifyPassword: "Mật khẩu của bạn không khớp"}
            }
        }
        return {
            status:true,
            message:{password: ""}
        }
    }

    const handleSubmitRegister = () => {
        const checkN=handleCheckName()
        const checkE=handleCheckEmail()
        const checkP=handleCheckPassword()
        setMessageError({...checkN.message,...checkE.message,...checkP.message})

        if(checkE.status && checkN.status && checkP.status){
            setStateCallApi(1);
            fetch('https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/user/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Email": email,
                "Name": name,
                "Password": password,
                "Role": "0"
            })
            })
            .then(res => {
                if (res.status === 200) {
                    setStateCallApi(2);
                    dispatch({type:"SET_DATA/EmailJustRegister", payload: email})
                    handleChangeLogin()
                    
                }
                else if(res.status === 404){
                    setStateCallApi(3)
                    setNotifyErrorRegister({message:"Email đã tồn tại !"})
                    
                }
                else {
                    dispatch({type: "SET_DATA/AuthenPopUpOFF"})
                    nav("*")
                }
            })
            .catch((err)=>{
                dispatch({type: "SET_DATA/AuthenPopUpOFF"})
                nav("*")
            })
        }
            
    }

    return (
        <div className="form max-w-md mx-auto min-h-[30rem] bg-slate-100 rounded shadow-form relative py-10 px-5 pointer-events-auto">
                    {notifyErrorRegister.message=="" ? undefined : <PopUpNotify handleOffPopUp={()=>setNotifyErrorRegister({message:""})} message={notifyErrorRegister.message}/>}
        <button onClick={()=>{dispatch({type:"SET_DATA/AuthenPopUpOFF" , payload: false})}}
        className="absolute -right-4 -top-4 w-8 h-8 bg-white text-black flex justify-center items-center rounded-[50%] font-medium hover:text-white text-2xl hover:bg-orange-500">
            <MdClose />
        </button>
        <h2 className='text-center text-3xl pb-5 font-medium'>Đăng ký tài khoản</h2>
     
        <div className="mt-3">
            <form className="formLogin">
                <div >
                    <input
                        className={`my-2 h-11 text-xl rounded-md px-3 truncate border-solid focus:outline-none border w-full ${messageError.name? "border-red-500": "border-blue-500"}`}
                        name="name"
                        type='name'
                        placeholder="Name"
                        onChange={(e)=>setName(e.target.value)}
                        onFocus={handleFoucsInput}
                    />
                    { messageError.name && <p className='mb-[8px] text-[14px] text-red-600 flex items-start ml-3 '><span className='mr-1 mt-1'>{<MdError/>}</span><span>{messageError.name} !</span></p>}
                </div>
                <div >
                    <input
                        className={`my-2 h-11 text-xl rounded-md px-3 truncate border-solid focus:outline-none border w-full ${messageError.email? "border-red-500": "border-blue-500"}`}
                        name="email"
                        type='email'
                        placeholder="Email"
                        onChange={(e)=>setEmail(e.target.value)}
                        onFocus={handleFoucsInput}
                    />
                    { messageError.email && <p className='mb-[8px] text-[14px] text-red-600 flex items-start ml-3 '><span className='mr-1 mt-1'>{<MdError/>}</span><span>{messageError.email} !</span></p>}
                </div>
                <div className="relative">
                    <input
                        className={`my-2 h-11 text-lg rounded-md px-3 truncate border-solid focus:outline-none border w-full ${messageError.password? "border-red-500": "border-blue-500"}`}
                        name="password"
                        type={ sightPassword ? "password" :"text"}
                        placeholder="Mật khẩu"
                        onChange={(e)=>setPassword(e.target.value)}
                        onFocus={handleFoucsInput}
                        />
                    { messageError.password && <p className='mb-[8px] text-[14px] text-red-600 flex items-start ml-3 '><span className='mr-1 mt-1'>{<MdError/>}</span><span>{messageError.password} !</span></p>}
                    <span className={`${password==="" ? "hidden":"flex"} text-2xl absolute flex justify-center items-center w-8 h-8 top-4 right-2 `} onClick={()=>setSightPassword((state)=>(!state))}> {sightPassword ? <AiOutlineEye/>: <AiOutlineEyeInvisible/>}</span>
                </div>
                <div className='relative'>
                    <input
                        className={`my-2 h-11 text-lg rounded-md px-3 truncate border-solid focus:outline-none border w-full ${messageError.verifyPassword? "border-red-500": "border-blue-500"}`}
                        name="verifyPassword"
                        type={ sightVerifyPassword ? "password" :"text"}
                        placeholder="Xác nhận mật khẩu"
                        onChange={(e)=>setverifyPassword(e.target.value)}
                        onFocus={handleFoucsInput}
                    />
                    { messageError.verifyPassword && <p className='mb-[8px] text-[14px] text-red-600 flex items-start ml-3 '><span className='mr-1 mt-1'>{<MdError/>}</span><span>{messageError.verifyPassword} !</span></p>}
                   <span className={`${verifyPassword==="" ? "hidden":"flex"} text-2xl absolute justify-center items-center w-8 h-8 top-4 right-2 `} onClick={()=>setSightVerifyPassword((state)=>(!state))}> {sightVerifyPassword ? <AiOutlineEye/>: <AiOutlineEyeInvisible/>}</span>
                </div>
              
                <div className='flex justify-center mt-5'>
                    <button type="button" className='bg-orange-500 text-white font-medium min-w-[6rem]  p-3 rounded text-md hover:bg-orange-400'
                        onClick={handleSubmitRegister}
                    > 
                        {stateCallApi===1 ? <span><div className="lds-dual-ring"></div></span> : ""}Đăng kí
                    </button>
                </div>
                <div className='text-center mt-7' >
                    Bạn đã có tài khoản ?
                    <span className='text-orange-500 hover:opacity-90 text-center' onClick={handleChangeLogin}> Đăng nhập</span>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Register;
