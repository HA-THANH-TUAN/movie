interface ImovieInfor {
    id: string,
    slug: string,
    name: string,
    subName: string,
    description: string,
    shortDescription: string,
    trailer: string|null,
    age: string,
    duration: any,
    views: number,
    status: number,
    startdate: string,
    enddate: string,
    previewId: any,
    reviewId: any,
    seoId: string,
    imageLandscape: string,
    imagePortrait: string,
    imageLandscapeMobile: string,
    point: number,
    totalVotes: number
}

export default ImovieInfor