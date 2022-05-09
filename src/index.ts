import express, {Request, Response} from "express";
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5000

interface Ivideo {
    id: number,
    title: string,
    author: string
}

let videos: Ivideo[] = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response) => {
    const raz = 'aaaaaaaaaaaaaaaaaaaaaffaa'
    console.log('sss')
    console.log('sss')
    res.send(raz)
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})


app.get('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(videos)
    }
})

app.post('/videos', (req, res) => {
    const newVideo: Ivideo = {
        id: videos[videos.length - 1].id + 1,
        title: req.body.title,
        author: videos[0].author
    }
    videos = [...videos, newVideo]
    res.status(201).send(newVideo)
})

app.put('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if(video) {
        video.title = req.body.title
        res.send(video)
    } else {
        res.send(404)
    }

})

app.delete('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId
    const filteredVideos = videos.filter(v => v.id !== id)
    if (videos.length > filteredVideos.length) {
        videos = filteredVideos
        res.send(204)
    } else {
        res.send(404)
    }


})

app.listen(port, () => {
    const a = 's'
    console.log(a)
    console.log(`Example app listening on port ${port}`)
})