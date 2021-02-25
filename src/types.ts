export type HistoryQuery = {
    period: string
    location: string
}

export type TimelineQuery = {
    date: string
    location: string
}

export type WeatherComparison = {
    address: string
    days: Day[]
}

export type Day = {
    datetime: string
    temp: number
    tempmin: number
    tempmax: number
    queryCost?: number
}
