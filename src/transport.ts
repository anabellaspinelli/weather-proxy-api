import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { WEATHER_API_KEY, WEATHER_API_URL } from './config'
import { HistoryQuery, TimelineQuery } from './types'
const newrelic = require('newrelic')

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

export const getWeatherComparison = async ({
    location,
    date,
}: TimelineQuery) => {
    const url = new URL(`${WEATHER_API_URL}/timeline/${location}/${date}`)
    const params = {
        unitGroup: 'metric',
        key: WEATHER_API_KEY,
        include: 'obs',
    }

    url.search = new URLSearchParams(params as any).toString()

    const weatherResponse = await fetch(url)
    if (weatherResponse.status !== 200) {
        return null
    }

    const weatherBody = await weatherResponse.json()

    newrelic.incrementMetric('WeatherQuery/Cost', weatherBody.queryCost);
    newrelic.recordCustomEvent('WeatherQuery', {
        address: weatherBody.address,
    })

    return weatherBody
}
