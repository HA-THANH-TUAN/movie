import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import ShowFullFilm from './page/ShowFullFilm/ShowFullFilm';
import MovieDetail from './page/MovieDetailPage/MovieDetailPage';
import ProcessBooking from './page/ProcessBooking/ProcessBooking';
import Footer from './Layout/Footer/Footer';
import CreditCard from './Layout/CreditCard/CreditCard';
import NavBar from './Layout/NavBar/NavBar';
import CalenderMoviePage from './page/CalenderMoviePage/CalenderMoviePage';
import NotFound from './page/NotFound/NotFound';
// import Authentication from './Components/Header/Authentication/Authentication';
import PrivateUser from './page/PrivateUser/PrivateBooking';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './Layout/ScrollToTop/ScrollToTop';
import Member from './Layout/Member/Member';
import PrivateMember from './page/PrivateMember/PrivateMember';
import Header from './Layout/Header/Header';
import Authentication from './Layout/Authentication/Authentication';


function App() {
  const dispatch=useDispatch()
  useEffect(() => {
      dispatch({type: "GET_DATA/AllMovie"})
      dispatch({type: "GET_DATA/CityAndCinema"})
      
    return ()=>{dispatch({type:"SET_DATA/resultApiAllMovie", payload:0 })}
  }, [])
  
  return (
    <div className="App relative ">
      <BrowserRouter>
        <ScrollToTop/>
          <Authentication/>
        <Header/>
        <NavBar/>
        <div>
        </div>
          <Routes >
            <Route path='/' element={<Home/>}></Route>
            <Route path='/phim-sap-chieu'  element={<ShowFullFilm/>}></Route>
            <Route path='/phim-dang-chieu'  element={<ShowFullFilm/>}></Route>
            <Route path='/dat-ve/:slug' element={<MovieDetail/>}></Route>
            <Route path='/booking-ticket/:infor' element={<PrivateUser><ProcessBooking/></PrivateUser>}></Route>
            <Route path='/mua-ve' element={<CalenderMoviePage/>}/>
            <Route path='/thanh-toan/:infor' element={<CreditCard/>}/>
            <Route path='/thanh-vien' element={<PrivateMember children={<Member/>}/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        <div className='sm:block hidden '>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
