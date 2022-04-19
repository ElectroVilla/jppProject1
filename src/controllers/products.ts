import {Products, ProductsStore} from '../models/products'
import express from 'express'

const func = new ProductsStore()

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
        const now = new Date()
        const newItem: Products = {
            name: req.body.name,
            coverimage: req.body.coverimage,
            description: req.body.description,
            price: req.body.price,
            introductiondate: now,
            brand: req.body.brand,
            category: req.body.category,
            featured: req.body.featured,
            new: req.body.new,
            review: req.body.review,
            tag: req.body.tag,
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
    const now = new Date()
    const updatedUser: Products = {
        id: parseInt(req.params.id), 
        name: req.body.name,
        coverimage: req.body.coverimage,
        description: req.body.description,
        price: req.body.price,
        introductiondate: now,
        brand: req.body.brand,
        category: req.body.category,
        featured: req.body.featured,
        new: req.body.new,
        review: req.body.review,
        tag: req.body.tag
    }
    try {
        const updated = await func.update(updatedUser)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const images = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.images(parseInt(req.params.id))
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const reviews = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.review(parseInt(req.params.id))
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const full = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.full(parseInt(req.params.id))
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const getnew = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.new()
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const featured = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.featured()
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}