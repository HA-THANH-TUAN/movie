import React, { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import "./UserLogin.scss";
import { FaUserCircle, FaUser } from 'react-icons/fa';
import Login from '../Authentication/Login/Login';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const UserLogin = (props) => {
    const nav = useNavigate();
    let isLogin = localStorage.getItem("email")
    console.log("isLogin", isLogin)
    const [modal, setModal] = useState(false)
    const handleOnclick = () => {
        props.actionToggleLogin()
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("email")
        localStorage.removeItem("login")
        nav('/');
    }

    const handleAccount = (e) => {
        e.preventDefault();
        nav('/thanh-vien');
    }
    return (
        <>
            {
                !props.modalLogin && <Login onClick={handleOnclick} />
            }
            {
                isLogin
                    ? <div className='userlogin cursor-pointer'>
                        <div className='no-login flex items-center justify-center relative'>
                            <span className='logo-user text-lg mx-1'>{<FaUser />}</span>
                            <span onClick={() => (setModal(!modal))} className='login px-1 font-semibold flex items-center'>{isLogin}<span className='ml-2'> <BsChevronDown /></span></span>
                            {
                                modal && <div className='user-option flex flex-col absolute bg-orange-300 rounded-md font-normal px-2 py-1 w-full'>
                                    <a onClick={handleAccount} className='after: hover:bg-zinc-200'>Tài khoản</a>
                                    <a onClick={handleLogout} className='after: hover:bg-zinc-200'>Thoát</a>
                                </div>
                            }
                        </div>
                    </div>
                    : <div onClick={handleOnclick} className='userlogin cursor-pointer'>
                        <div className='no-login flex items-center justify-center relative'>
                            <span className='logo-user text-lg mx-1'>{<FaUser />}</span>
                            <span className='login px-1 font-semibold flex items-center'>Đăng nhập</span>
                        </div>
                    </div>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    modalLogin: state.modalLoginManage
})

const mapDispatchToProps = (dispatch) => ({
    actionToggleLogin: () => dispatch({ type: "TOGGLE_LOGIN" })
})
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
