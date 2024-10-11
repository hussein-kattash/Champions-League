export interface ClubModel{
    id: number
    clubName: string
    country: string
    logo: string
}

export interface MatchModel{
    club1: ClubModel
    club2: ClubModel
    place: string
}