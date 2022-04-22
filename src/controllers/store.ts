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

export const orderCartPost = async (req: express.Request, res: express.Response):Promise<void> => {
    const uid = parseInt(req.body.uid)
    try {
        console.log(uid)
        const result = await func.orderCartPost(uid) 
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

export const admin = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await func.getAdmin()
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

export const search = async (req: express.Request, res: express.Response):Promise<void> => {
    const key = req.body.key
    try {
        const result = await func.search(key)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

export const orderProduct = async (req: express.Request, res: express.Response):Promise<void> => {
    const pid = req.body.pid
    const uid = req.body.uid
    const qty = req.body.qty
    try {
        const result = await func.orderProducts(pid, qty, uid)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

export const filter = async (req: express.Request, res: express.Response):Promise<void> => {
    const min = req.body.min
    const max = req.body.max
    const brand = req.body.brand
    const cat = req.body.cat
    try {
        const result = await func.filter(min, max, cat, brand)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

