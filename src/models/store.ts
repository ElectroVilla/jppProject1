import client from "../database";
import { Orders, OrdersStore } from "./orders";
import { cartItems } from "./cart_items";
// import wbm from 'wbm'

export class storeStore{
    async getOrderId(userId:number): Promise<Orders>{
        const now = new Date()
        const sql = 'SELECT * FROM orders WHERE status=0;'
        const conn = await client.connect()
        const result = await conn.query(sql)
        let order:Orders
        if (result.rows.length) {
            order = result.rows[0]
        }else{
            const sql = 'INSERT INTO orders (status, userid, date, payment, coupon) VALUES(0, $1, $2, \'Not Defined\', 1) RETURNING *;'
            const result = await conn.query(sql, [userId, now])
            order = result.rows[0]
        }
        conn.release()
        return order
    }
    async ordercart(id: number): Promise<{order:Orders, cart:cartItems[]}> {
        try {
            const order = await this.getOrderId(id)
            const conn = await client.connect()
            const sql2 = 'SELECT * FROM cart_items where orderid=$1;'
            const result2 = await conn.query(sql2, [order['id']])
            const cart: cartItems[] = result2.rows
            conn.release()
            return {order, cart}
        } catch (err) {
            throw new Error(`Could not find record ${id}. Error: ${err}`)
        }
    }
    
    async cartproduct(productid: number, qty: number, userid: number): Promise<{order:Orders, cart:cartItems[]}>{
        try {
            const order = await this.getOrderId(userid)
            const oid = order['id']
            console.log('OID = ' + oid + `, Qty= ${qty}, pid = ${productid}`)
            const conn = await client.connect()
            const sql = 'INSERT INTO cart_items (qty, productid, orderid) VALUES($1, $2, $3) RETURNING *;'
            const result = await conn.query(sql, [qty, productid, oid])
            console.log('in Mina')
            const cart = result.rows[0]
            conn.release()
            return {order, cart}           
        } catch (err) {
            throw new Error(`Could not find record. Error: ${err}`)
        }
    }

    // async whatsapp(phone:string, message:string): Promise<void>{
    //     try {
    //         await wbm.send(phone, message)
    //         await wbm.end
    //     } catch (err) {
    //         throw new Error(`Could not find record. Error: ${err}`)
    //     }
    // }
    
    async orderCartPost(userid: number): Promise<{order:Orders, cart:cartItems[]} | null>{
        try {
            let order:Orders
            const sql = 'SELECT * FROM orders WHERE status=0 and userid=($1);'
            const conn = await client.connect()
            const result = await conn.query(sql)
            if (result.rows.length) {
                order = result.rows[0]


                const cart = result.rows[0]
                const oid = order['id']
                conn.release()
                return {order, cart}
            }else{
                return null
            }
            // const order = await this.getOrderId(userid)
            // const oid = order['id']
            // const sql = 'INSERT INTO cart_items (qty, productid, orderid) VALUES($1, $2, $3) RETURNING *;'
            // const result = await conn.query(sql, [qty, productid, oid])
            
            
            
        } catch (err) {
            throw new Error(`Could not find record. Error: ${err}`)
        }
    }

}

// async ordercart(id: number): Promise<{order:Orders, cart:cartItems[]}> {
    //     try {
    //         const now = new Date()
    //         const sql = 'SELECT * FROM orders WHERE status=0;'
    //         const conn = await client.connect()
    //         const result = await conn.query(sql)
    //         let order:Orders
    //         let orderId:number
    //         if (result.rows.length) {
    //             orderId = result.rows[0]['id']
    //             order = result.rows[0]
    //         }else{
    //             const sql = 'INSERT INTO orders (status, userid, date, payment, coupon) VALUES(0, $1, $2, \'Not Defined\', 1) RETURNING *;'
    //             const result = await conn.query(sql, [id, now])
    //             order = result.rows[0]
    //             orderId = 0
    //         }
    //         const sql2 = 'SELECT * FROM cart_items where orderid=$1;'
    //         const result2 = await conn.query(sql2, [orderId])
    //         let cart: cartItems[] = result2.rows
    //         conn.release()
    //         return {order, cart}
    //     } catch (err) {
    //         throw new Error(`Could not find record ${id}. Error: ${err}`)
    //     }
    // }
