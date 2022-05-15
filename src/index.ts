import express, {Request, Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRepository} from "./repositories/videos-repository";

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5000

interface Ivideo {
    id: number,
    title: string,
    author: string
}

// let videos: Ivideo[] = [
//     {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
//     {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
//     {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
//     {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
//     {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
// ]

app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

app.use('/videos')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})