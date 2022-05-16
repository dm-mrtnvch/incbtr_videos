import express, {Request, Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRouter} from "./routes/ videos-routes";
import {authMiddleware} from "./middlewares/auth-middleware";

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(authMiddleware)
const port = process.env.PORT || 5000


app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})
app.use('/videos', videosRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})