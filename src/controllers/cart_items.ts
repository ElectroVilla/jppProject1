import {cartItems, CartItemsStore} from '../models/cart_items'
import express from 'express'

const func = new CartItemsStore()

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
        const newItem: cartItems = {
            qty: req.body.qty,
            productid: req.body.productid,
            orderid: req.body.orderid,
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
    const updatedUser: cartItems = {
        id: parseInt(req.params.id), 
        qty: req.body.qty,
        productid: req.body.productid,
        orderid: req.body.orderid
    }
    try {
        const updated = await func.update(updatedUser)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
