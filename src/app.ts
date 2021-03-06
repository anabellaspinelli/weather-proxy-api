import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { nextTick } from 'process'
import { getWeatherComparison, getWeatherHistory } from './transport'
import { HistoryQuery, TimelineQuery, WeatherComparison, Day } from './types'

const app = express()
app.use(cors())

app.get('/_health', (_: Request, res: Response) => {
    res.send(`up and running on port ${process.env.PORT}`)
})

app.get('/weather', async (req: Request, res: Response, next: NextFunction) => {
    const { period, location } = req.query as HistoryQuery

    try {
        const weatherBody = await getWeatherHistory({ location, period })
        res.send(weatherBody)
    } catch (error) {
        next(error)
    }
})

app.get(
    '/weather-comparison',
    async (req: Request, res: Response, next: NextFunction) => {
        const { date: requestedDate, location } = req.query as TimelineQuery

        const dates = queryDates(requestedDate)

        const weather: WeatherComparison = {
            address: '',
            days: [],
        }

        try {
            for (const date of dates) {
                const dateWeather = await getWeatherComparison({
                    location,
                    date,
                })
                if (dateWeather === null) {
                    res.statusCode = 404
                    res.send()
                    return
                }

                if (weather.address === '') {
                    weather.address = dateWeather.resolvedAddress
                }

                weather.days.push(parseWeather(dateWeather))
            }

            res.send(weather)
        } catch (error) {
            next(error)
        }
    },
)

const parseWeather = (weather: any): Day => {
    return {
        datetime: weather.days[0].datetime,
        temp: weather.days[0].temp,
        tempmin: weather.days[0].tempmin,
        tempmax: weather.days[0].tempmax,
    }
}

const queryDates = (date: string) => {
    const dateSplit = date.split('-')

    const year = Number(dateSplit[0])
    const month = dateSplit[1]
    const day = dateSplit[2]

    return [
        date,
        `${year - 10}-${month}-${day}`,
        `${year - 20}-${month}-${day}`,
        `${year - 30}-${month}-${day}`,
        `${year - 40}-${month}-${day}`,
        `${1973}-${month}-${day}`,
    ]
}

export default app
