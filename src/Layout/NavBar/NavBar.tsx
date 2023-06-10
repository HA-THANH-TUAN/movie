
import {NavLink} from 'react-router-dom';
const NavBar = () => {

    return (
        <nav className='navbar sm:block hidden '>
            <ul className= {`bg-blue-500 text-white justify-evenly flex`}>
                <li className='mx-5 text-white hover:scale-105 transition-colors md:text-xl  font-bold tracking-widest'><NavLink className="block p-3" to=''>TRANG CHỦ</NavLink></li>
                <li className='mx-5 text-white hover:scale-105 transition-colors md:text-xl  font-bold tracking-widest'><NavLink className="block p-3" to='mua-ve'>LỊCH CHIẾU</NavLink></li>
                <li className='mx-5 text-white hover:scale-105 transition-colors md:text-xl  font-bold tracking-widest'><NavLink className="block p-3" to='thanh-vien'>THÀNH VIÊN</NavLink></li>
            </ul>   
        </nav>
    );
}

export default NavBar;
