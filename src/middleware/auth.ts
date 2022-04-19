import express from 'express'
import jwt, { Secret } from 'jsonwebtoken'

const verifyAuthToken = (req: express.Request, res: express.Response, next:Function) => {
    try {
        const token = req.query.token as string
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret)
        // console.log(decoded)
        next()
    } catch (err) {
        res.status(401)
        res.json(`Invalid Token ${err}`)
    }
}

export default verifyAuthToken