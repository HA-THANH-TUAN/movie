interface Isession{
    id: string,
    cinemaId: string,
    scheduledFilmId: string,
    sessionId: string,
    areaCategoryCodes:any [],
    isAllocatedSeating: boolean,
    allowChildAdmits: boolean,
    seatsAvailable: number,
    allowComplimentaryTickets: boolean,
    eventId: string,
    priceGroupCode: string,
    screenName: string,
    screenNameAlt: string,
    screenNumber: string,
    cinemaOperatorCode: string,
    formatCode: string,
    formatHopk: string,
    salesChannels: string,
    sessionAttributesNames: any [],
    conceptAttributesNames: any [],
    allowTicketSales: boolean,
    hasDynamicallyPricedTicketsAvailable: boolean,
    playThroughId: null|string,
    sessionBusinessDate: string,
    sessionDisplayPriority: number,
    groupSessionsByAttribute: boolean,
    soldoutStatus: number,
    typeCode: string,
    dayOfWeekLabel: string,
    dayOfWeekKey: string,
    showDate: string,
    showTime: string

}

interface Ibundle {
    caption:string,
    code:string,
    version:string,
    sessions:Isession[],
}

 export interface Idate {
    showDate: string,
    dayOfWeekLabel: string,
    bundles:Ibundle[],
  }
  
interface ImovieDetail {
    id: string,
    slug: string,
    name: string,
    vistaName: string,
    description: string,
    code: string,
    order: 1,
    phone: string,
    address: string,
    cityId: string,
    mapEmbeb: string,
    status: number,
    reward: number,
    createdAt: string,
    updatedAt: string,
    createdBy: string|null,
    updatedBy: string,
    oldId: number,
    imageUrls: string [],
    ticket: {name:string, url:string}[],
    imageLandscape: string|null,
    imagePortrait: string|null,
    longitude: string,
    latitude: string,
    cityIds: string|null,
    dates: Idate[]
  }


export default ImovieDetail