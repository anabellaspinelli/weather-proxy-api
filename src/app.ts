import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { nextTick } from 'process'
import { getWeatherHistory } from './transport'
import { HistoryQuery } from './types'

const app = express()
app.use(cors())

app.get('/_health', (_: Request, res: Response) => {
    res.send(`up and running on port`)
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

export default app
