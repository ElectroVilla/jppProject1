import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import errorMiddleware from './middleware/error.middleware'
import routes from './routes'

const corsOptions = {// Updated to fix cors error
    origin: '*',
    optionsSuccessStatus: 200
}
dotenv.config()
const PORT = process.env.PORT

// create an instance server
const app: Application = express()
// Middleware to parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())
// HTTP request logger middleware
app.use(morgan('common'))
// HTTP security middleware headers
app.use(helmet())
// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Unauthorized repetitive access; Stay away or my guards will smash your head bones.',
  })
)
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(errorMiddleware)
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World! ... this is the project root')
})
app.use('/api', routes)

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh you are lost, read the API documentation to find your way back home 😂',
  })
})

// error handler middleware
app.use(errorMiddleware)


// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app

