import fetchData from "./fetchDataGet"
import fetchDataPost from "./fetchDataPost";

interface IbodyPaying {
    CardNumber: string,
    ExpireDate: string,
    CVV: string,
    CardName: string,
    BankId:number
    Price:string,
    Email:string,
    Combo:string,
    SeatCode:string,
    ShowTime: string;
    CinemaName: string | undefined;
    TheaterName: string | undefined;
    FilmName: string | undefined;
    ImageLandscape: string | undefined;
    ImagePortrait: string | undefined;
}

const payingApi={
    getListBank:()=>{
        const data=`Bank/Bank`
        return fetchData(data)
    },
    postPaying:(body:IbodyPaying)=>{
        const data=`cinema/Ticket`
        return fetchDataPost(data, body)
    },
}

export default payingApi
