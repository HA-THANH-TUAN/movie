import { Idate } from "./movieDetail";

export interface ImoviesForCinema {
      movieName: string,
      slug: string,
      duration: string,
      startdate: string,
      name: string,
      subName: string,
      point: number,
      totalVotes: number,
      age: string,
      description: string,
      id: string,
      imageLandscape: string,
      imagePortrait: string,
      dates: Idate[]
    }