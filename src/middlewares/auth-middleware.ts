import {Request, Response, NextFunction} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token
    if(token){
        next()
    } else {
        res.sendStatus(404)
    }
}