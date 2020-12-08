import cors from 'cors'
import express, { Request, Response } from 'express'
import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { WEATHER_API_URL } from './config'

const app = express()
app.use(cors())

app.get('/_health', (_: Request, res: Response) => {
    res.send(`up and running on port`)
})

app.get('/weather', async (req: Request, res: Response) => {
    const url = new URL(`${WEATHER_API_URL}/history`)
    const params = {
        aggregateHours: '24',
        locationMode: 'single',
        period: req.query.period,
        contentType: 'json',
        unitGroup: 'metric',
        // eslint-disable-next-line no-undef
        key: process.env.WEATHER_API_KEY,
        locations: req.query.location,
    }

    url.search = new URLSearchParams(params as any).toString()

    const weatherResponse = await fetch(url)
    const weatherBody = await weatherResponse.json()
    res.send(weatherBody)
})

export default app
