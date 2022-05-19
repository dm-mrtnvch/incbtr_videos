import {Request, Response, Router} from 'express'
import {videos, videosRepository} from "../repositories/videos-repository";
import {authMiddleware} from "../middlewares/auth-middleware";
import {body, validationResult} from "express-validator";
import {inputValidatorMiddleware} from "../middlewares/input-validator-middleware";

// put here array with videos
export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videosRepository.getVideos())
})
    .get('/:videoId', (req: Request, res: Response) => {
        const id = +req.params.videoId
        const video = videosRepository.getVideoById(id)

        if (video) {
            res.send(video)
        } else {
            res.send(404)
        }
    })
    .post('',
        authMiddleware,
        body('title')
            .isLength({max: 15})
            .withMessage('Max 15 symbols')
            .matches(/^[\w ]*$/)
            .withMessage('only letters and numbers'),
        inputValidatorMiddleware,
        (req: Request<{}, {}, {title: string}>, res: Response) => {
            const newVideo = videosRepository.createVideo(req.body.title)
            res.status(201).send(newVideo)
        })
    .put('/:videoId', authMiddleware, (req: Request, res: Response) => {
        if (!req.body.title || req.body.title.length > 40) {
            res.status(400).send({errorsMessages: [{message: "string", field: "title"}], resultCode: 1})
            return
        }
        const id = +req.params.videoId
        const updatedVideo = videosRepository.updateVideoById(id, req.body.title)
        if (updatedVideo) {
            res.send(204)
        } else {
            res.send(404)
        }
    })
    .delete('/:videoId', authMiddleware, (req: Request, res: Response) => {
        const id = +req.params.videoId
        const isDeleted = videosRepository.deleteVideoById(id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

