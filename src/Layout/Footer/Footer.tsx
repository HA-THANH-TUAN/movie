import React from 'react';
import { Link } from 'react-router-dom';
import logoFooter from "../../assets/images/galaxy-logo-footer.png"
import logoTrade from "../../assets/images/glx_trade.png"
import { FaFacebookSquare, FaYoutubeSquare, FaInstagramSquare } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='footer bg-black my-3 text-white'>
            <div className='mx-auto max-w-screen-2xl '>
                <div className='footer-top flex flex-wrap mx-5 md:mx-10'>
                    <ul className='content flex flex-wrap flex-grow justify-between  '>
                        <li >
                            <h2 className='font-bold py-2 text-orange-500'>GIỚI THIỆU</h2>
                            <ul className='text-xs '>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> VỀ CHÚNG TÔI </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> THẢO THUẬN SỬ DỤNG </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> QUY CHẾ HOẠT ĐỘNG </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> CHÍNH SÁCH BẢO MẬT </span></a></li>
                            </ul>
                        </li>
                        <li >
                            <h2 className='font-bold py-2 text-orange-500'>GÓC ĐIỆN ẢNH</h2>
                            <ul className='text-xs'>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> THỂ LOẠI PHIM </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> BÌNH LUẬN PHIM </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> BLOG ĐIỆN ẢNH </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> PHIM HAY THÁNG </span></a></li>
                            </ul>
                        </li>
                        <li >
                            <h2 className='font-bold py-2 text-orange-500'>HỖ TRỢ</h2>
                            <ul className='text-xs'>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> GÓP Ý </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> SALE & SERVICES </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> RẠP / GIÁ VÉ </span></a></li>
                                <li><a className='flex items-center hover:text-orange-500' href="#"><span className='text-xl md:text-3xl pb:1 md:pb-2'>&raquo;</span><span className='pl-2'> TUYỂN DỤNG </span></a></li>
                            </ul>
                        </li>
                        <li >
                            <h2 className='font-bold py-2 text-orange-500'>KẾT NỐI GALAXY CINEMA</h2>
                            <ul className='text-xs flex'>
                                <li><a className='items-center hover:text-orange-500' href="#"><span className='pr-10 text-2xl md:text-4xl '><FaFacebookSquare /></span></a></li>
                                <li><a className='items-center hover:text-orange-500' href="#"><span className='pr-10 text-2xl md:text-4xl '> <FaYoutubeSquare /> </span></a></li>
                                <li><a className='items-center hover:text-orange-500' href="#"><span className='pr-10 text-2xl md:text-4xl '> <FaInstagramSquare /> </span></a></li>
                            </ul>
                            <div className='w-[120px] md:w-40 mb-5'>
                                <img src={logoTrade} alt="logo-trade" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='footer-bottom flex py-4 border-t-2 border-emerald-600 border-solid items-center '>
                    <Link to="/">
                        <img src={logoFooter} alt="logo-footer" className='w-30 ml-5 md:ml-10'/>
                    </Link>
                    <span className='text-white ml-10'>Công Ty Cổ Phần Phim Thiên Ngân, Tầng 3, Toà Nhà Bitexco Nam Long, 63A Võ Văn Tần, P. Võ Thị Sáu, Quận 3, Tp. Hồ Chí Minh</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
