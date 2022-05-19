import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

export const inputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } else {
        res.status(400).json({
            data: {},
            resultCode: 1,
            errorMessages: errors.array().map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })});
    }
}