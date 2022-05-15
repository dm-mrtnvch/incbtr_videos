import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";

// put here array with videos
export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videosRepository.getVideos())
})
    .get('/:videoId', (req, res) => {
        const id = +req.params.videoId
        const video = videosRepository.getVideoById(id)

        if (video) {
            res.send(video)
        } else {
            res.send(404)
        }
    })
    .post('', (req, res) => {
        if (req.body.title || req.body.title.length < 40) {
            const newVideo = videosRepository.createVideo(req.body.title)
            res.status(201).send(newVideo)
        } else {
            res.status(400).send({errorsMessages: [{message: "string", field: "title"}], resultCode: 1})
        }
    })
    .put('/:videoId', (req: Request, res: Response) => {
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
    .delete('/:videoId', (req, res) => {
        const id = +req.params.videoId
        const isDeleted = videosRepository.deleteVideoById(id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

