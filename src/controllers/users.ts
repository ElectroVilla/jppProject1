import {User, UsersStore} from '../models/users'
import express from 'express'

const users = new UsersStore()

export const index = async (_req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await users.index() 
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const show = async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const result = await users.show(parseInt(req.params.id))
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const create = async (req: express.Request, res: express.Response) => {
        const newUser: User = {
            first_name: req.body.first,
            last_name: req.body.last,
            email: req.body.email,
            phone: req.body.phone,
            address1: req.body.address1,
            address2: req.body.address2,
            auth: req.body.auth,
            password: req.body.pw,
            status: req.body.status,
            id: 0
        }
    try {
        const result = await users.create(newUser)
        res.json(result)        
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}
export const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deleted = await users.delete(parseInt(req.params.id))
        res.json(deleted)    
    } catch (err) {
        res.status(400)
        res.json(err)
    }
    
}
export const update = async (req: express.Request, res: express.Response) => {
    const updatedUser: User = {
        id: parseInt(req.params.id), 
        first_name: req.body.first,
        last_name: req.body.last,
        email: req.body.email,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        auth: req.body.auth,
        password: req.body.pw,
        status: req.body.status
    }
    try {
        const updated = await users.update(updatedUser)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const updatePassword = async (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.id)
        const password_new = req.body.pw
        const updated = await users.updatePw(id, password_new)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
export const authenticate = async (req: express.Request, res: express.Response) => {
    const email = req.body.email
    const password = req.body.pw
    try {
        const updated = await users.authenticate(email, password)   
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
