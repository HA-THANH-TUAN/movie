import fetchData from "./fetchDataGet"

const bookingApi={
    getBookingDetail:()=>{
        const data=`cinema/booking/detail`
        return fetchData(data)
    },
    getSeatBooked:(cinemaId:string,sessionId:string)=>{
        const data=`cinema/TicketByShowCode/${cinemaId}-${sessionId}`
        return fetchData(data)
    },
}

export default bookingApi

