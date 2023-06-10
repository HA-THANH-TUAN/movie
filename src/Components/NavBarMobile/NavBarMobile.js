import React from 'react';
import {AiOutlineHome} from "react-icons/ai"
import {TfiLayoutMediaCenterAlt} from "react-icons/tfi"
import {TbMovie} from "react-icons/tb"
import { SlUser } from "react-icons/sl";
import {NavLink } from 'react-router-dom';
import "./NavBarMobile.scss"


const NavBarMobile = () => {
    return (
        <nav className="nav-bar-mobile fixed bottom-0 py-1 bg-white w-full z-20 border-t border-zinc-300 border-solid md:hidden">
            <ul className='flex w-full items-center'>
                <li className='flex-1 flex justify-center items-center'>
                    <NavLink to="/">
                        <p className='flex justify-around items-center text-zinc-400 flex-col'>
                            <span className=' text-2xl icon'><AiOutlineHome/></span><span className=' font-bold  content invisible absolute'>Trang chủ</span>
                        </p>
                    </NavLink>
                </li>
                <li className='flex-1 flex justify-center items-center'>
                    <NavLink to="/mua-ve">
                        <p className='flex justify-around items-center text-zinc-400 flex-col'>
                            <span className=' text-2xl icon'><TfiLayoutMediaCenterAlt/></span><span className=' font-bold  content invisible absolute'>Mua vé</span>
                        </p>
                    </NavLink>
                </li>
                <li className='flex-1 flex justify-center items-center'>
                    <NavLink to="/thanh-vien">
                        <p className='flex justify-around items-center text-zinc-400 flex-col'>
                            <span className=' text-2xl icon'><SlUser/></span><span className=' font-bold  content invisible absolute'>Tài khoản</span>
                        </p>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBarMobile;
