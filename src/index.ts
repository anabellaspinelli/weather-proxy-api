import './load-env'
import app from './app'
import { PORT } from './config'

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.info(`Listening on port ${PORT}`)
})
