import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json({
        message: "Sin autorización"
    })

    jwt.verify(authHeader, 'mywordtoken', (error, data) => {
        if(error) return res.status(401).json({
            message: "El token no coincide"
        })
        console.log('my data: ', data)
        next()
    })
}