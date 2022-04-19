import express from 'express'
import { storeStore } from '../models/store'

const func = new storeStore()

export const ordercart = async (req: express.Request, res: express.Response):Promise<void> => {
    const id = parseInt(req.params.id)
    try {
        const result = await func.ordercart(id) 
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

export const cartproduct = async (req: express.Request, res: express.Response):Promise<void> => {
    const uid = parseInt(req.body.uid)
    const qty = parseInt(req.body.qty)
    const pid = parseInt(req.body.pid)
    try {
        const result = await func.cartproduct(pid, qty, uid) 
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
