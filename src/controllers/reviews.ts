import {Review, ReviewStore} from '../models/reviews'
import express from 'express'

const func = new ReviewStore()

export const index = async (_req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.index() 
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const show = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.show(parseInt(req.params.id))
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const create = async (req: express.Request, res: express.Response) => {
        const newItem: Review = {
            product: req.body.product,
            stars: req.body.stars,
            comments: req.body.comments,
            user: req.body.user,
            id: 0
        }
    try {
        const result = await func.create(newItem)
        res.json(result)        
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}
export const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deleted = await func.delete(parseInt(req.params.id))
        res.json(deleted)    
    } catch (err) {
        res.status(400)
        res.json(err)
    }
    
}
export const update = async (req: express.Request, res: express.Response) => {
    const updatedUser: Review = {
        id: parseInt(req.params.id), 
        product: req.body.product,
        stars: req.body.stars,
        comments: req.body.comments,
        user: req.body.user
    }
    try {
        const updated = await func.update(updatedUser)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
