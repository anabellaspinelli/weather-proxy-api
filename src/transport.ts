import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { WEATHER_API_KEY, WEATHER_API_URL } from './config'
import { HistoryQuery, TimelineQuery } from './types'

export const getWeatherHistory = async ({ location, period }: HistoryQuery) => {
    const url = new URL(`${WEATHER_API_URL}/weatherdata/history`)
    const params = {
        aggregateHours: '1',
        locationMode: 'single',
        period,
        contentType: 'json',
        unitGroup: 'metric',
        key: WEATHER_API_KEY,
        locations: location,
    }

    url.search = new URLSearchParams(params as any).toString()

    const weatherResponse = await fetch(url)
    const weatherBody = await weatherResponse.json()

    return weatherBody
}

export const getWeatherComparison = async ({ location, date }: TimelineQuery) => {
    const url = new URL(`${WEATHER_API_URL}/timeline/${location}/${date}`)
    const params = {
        unitGroup: 'metric',
        key: WEATHER_API_KEY,
    }

    url.search = new URLSearchParams(params as any).toString()

    const weatherResponse = await fetch(url)
    const weatherBody = await weatherResponse.json()

    return weatherBody
}
