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

app.get('/videos', (req: Request, res: Response) => {
    res.send(videosRepository.getVideos())
})

app.get('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId
    const video = videosRepository.getVideoById(id)

    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

app.post('/videos', (req, res) => {
    if (req.body.title || req.body.title.length < 40) {
        const newVideo = videosRepository.createVideo(req.body.title)
        res.status(201).send(newVideo)
    } else {
        res.status(400).send({errorsMessages: [{message: "string", field: "title"}], resultCode: 1})
    }
})

app.put('/videos/:videoId', (req: Request, res: Response) => {
    if (!req.body.title || req.body.title.length > 40) {
        res.status(400).send({errorsMessages: [{message: "string", field: "title"}], resultCode: 1})
        return
    }
    const id = +req.params.videoId
    const updatedVideo = videosRepository.updateVideoById(id, req.body.title)
    if (updatedVideo  ) {
        res.send(204)
    } else {
        res.send(404)
    }
})

app.delete('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId
    const isDeleted = videosRepository.deleteVideoById(id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})