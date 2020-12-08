import { Request, Response } from 'express'
import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3001

app.get('/_health', (_: Request, res: Response) => {
    res.send(`up and running on port ${port}`)
})

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.info(`Example app listening at http://localhost:${port}`)
})
