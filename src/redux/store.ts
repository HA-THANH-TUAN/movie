import { applyMiddleware, combineReducers, createStore } from "redux";
import rdcStoreMoiveCityCinema from "./reducer/rdcStoreMoiveCityCinema";
import reduxSaga from 'redux-saga';
import middleReSa from "./saga/middleReSa";
import rdcMovieDetailPage from "./reducer/rdcMovieDetailPage";
import rdcBookingMovie from "./reducer/rdcBookingMovie";
import rdcModalPopUp from "./reducer/rdcModalPopUp";
import rdcAuthentication from "./reducer/rdcAuthentication";

const middleware = reduxSaga()
const globalState=combineReducers({
    storeMovieCityCinemaManage: rdcStoreMoiveCityCinema,
    modalPopUpManage: rdcModalPopUp,
    authenticationManage:rdcAuthentication,
    movieDetailPageManage: rdcMovieDetailPage,
    bookingMovieManage: rdcBookingMovie
})

const store =createStore(globalState, applyMiddleware(middleware))
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
middleware.run(middleReSa)