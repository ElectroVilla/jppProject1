import {Coupons, CouponsStore} from '../models/coupons'
import express from 'express'

const func = new CouponsStore()

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
        const newItem: Coupons = {
            name: req.body.name,
            available: req.body.available,
            validtille: req.body.validtill,
            discounttype: req.body.discounttype,
            discountvalue: req.body.discountvalue,
            minorder: req.body.minorder,
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
    const updatedUser: Coupons = {
        id: parseInt(req.params.id), 
        name: req.body.name,
        available: req.body.available,
        validtille: req.body.validtill,
        discounttype: req.body.discounttype,
        discountvalue: req.body.discountvalue,
        minorder: req.body.minorder
    }
    try {
        const updated = await func.update(updatedUser)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
