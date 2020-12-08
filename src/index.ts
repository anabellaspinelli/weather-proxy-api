import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { WEATHER_API_URL } from './config'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 3001
app.use(cors())

app.get('/_health', (_: Request, res: Response) => {
    res.send(`up and running on port ${port}`)
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

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.info(`Example app listening at http://localhost:${port}`)
})
