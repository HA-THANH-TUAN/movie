import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import LayoutSeats from './LayoutSeat/LayoutSeat';
import ExplainSeat from './ExplainSeat/ExplainSeat';

const BookingSeat = (props) => {
    const dataSeatCinema=useSelector((state)=>state.bookingMovieManage.dataSeatCinema.seatLayoutData?.areas)  
    // const ne=useSelector((state)=>state.bookingMovieManage.)  
    return (
        <div className='seat-cinema'>
            {dataSeatCinema&&
            <>
                <LayoutSeats dataSeatCinema={dataSeatCinema} />
                <ExplainSeat/>
            </>}
        </div>
    );
}


export default BookingSeat;
