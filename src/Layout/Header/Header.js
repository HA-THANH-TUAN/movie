import React, { useState } from 'react';
import "./Header.scss"
import logo from "../../assets/images/galaxy-logo.png"
import logoMobile from "../../assets/images/logo-cinema-1.png"
import { FaUserCircle } from "react-icons/fa";
import { ImArrowLeft2 } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import SearchMovie from './SearchMovie/SearchMovie';
import { useDispatch, useSelector } from 'react-redux';
const Header = (props) => {
    const [focusSearch, setFocusSearch] = useState(false)
    const renderHeader = useSelector((state)=>state.authenticationManage.renderHeader)
    const dispatch=useDispatch()
    const nav=useNavigate()
    const handleLogout =()=>{
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("Name");
        dispatch({
            type:"SET_DATA/ReRenderHeader",
            payload:!renderHeader
        })
    }
    const handleClickHistory=()=>{
        nav("/thanh-vien")
    }
    return (
        <div className='header bg-slate-100'>
            <div className='max-w-7xl h-24 mx-auto flex items-center'>
                <div className='w-full'>
                    <div className='px-2 justify-around flex items-center w-full'>
                        <div className='flex items-center'>
                            <span className={` text-2xl px-2 ${focusSearch ? "":"hidden"} md:hidden`} onClick={()=>setFocusSearch(false)}><ImArrowLeft2/></span>
                            <Link className='hidden lg:inline-block' to="/" ><img className='w-80 mr-10 ' src={logo} alt="logo" /></Link>
                            <Link className='lg:hidden' to="/" ><img className={`${focusSearch ? "w-0" :"'min-w-[70px] mr-10  w-20"} transition-all md:w-24 inline-block`} src={logoMobile} alt="logo" /></Link>
                        </div>
                        <SearchMovie focusSearch={focusSearch} setFocusSearch={setFocusSearch}/>

                        <div className={`my-3 ${ focusSearch ?`hidden`:""} md:block`}>
                            {
                                sessionStorage.getItem("isLogin") ?
                                <div className='logined text-orange-500 ml-10 w-fit flex  relative z-[100]'>
                                    <div className='flex justify-center flex-col items-center'>
                                        <span className=' text-3xl'><FaUserCircle/></span>
                                        <span className='block flex-none font-medium mb-4 text-center sm:w-28 w-24 truncate  text-sm '>{sessionStorage.getItem("Name")}</span>
                                    </div>
                                  
                                    <ul className='logined-option hidden bg-slate-300 text-black w-44 py-2 pl-4 rounded -bottom-[70px]
                                    '>
                                        <li onClick={handleClickHistory} className='hover:pl-2 hover:font-medium transition hover:cursor-pointer my-1 duration-200 hover:translate-x-2'>Lịch sử giao dịch</li>
                                        <li onClick={handleLogout} className='hover:pl-2 hover:font-medium transition hover:cursor-pointer my-1 duration-200 hover:translate-x-2'>Đăng xuất</li>
                                    </ul>
                                </div>: 
                                <div className='  ml-10 w-fit flex justify-center flex-col items-center'
                                    onClick={()=>{dispatch({type: "SET_DATA/AuthenPopUpON", payload: true})}}
                                >
                                    <span className='text-black text-4xl hover:cursor-pointer hover:scale-110'><FaUserCircle/></span>
                                    <span className='block flex-none font-semibold text-zinc-600 truncate text-center'>Đăng nhập </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

