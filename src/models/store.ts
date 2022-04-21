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
    
    async orderCartPost(userid: number): Promise<{order:Orders, cart:cartItems[], newCart:Orders} | null>{
        try {
            let order:Orders
            const sql = 'SELECT * FROM orders WHERE status=0 and userid=($1);'
            const conn = await client.connect()
            const result = await conn.query(sql, [userid])
            if (result.rows.length) {
                const oldOrder = result.rows[0]
                const oid = oldOrder['id']
                let sql = 'UPDATE orders SET status=1 WHERE id=$1 RETURNING *;'
                const sqlOrder = await conn.query(sql, [oid])
                order = sqlOrder.rows[0]
                sql = 'SELECT * FROM cart_items WHERE orderid=($1);'
                const res = await conn.query(sql, [oid])
                const cart = res.rows
                const newCart = await this.getOrderId(userid)
                conn.release()
                return {order, cart, newCart}
            }else{
                conn.release()
                console.log("No order found")
                return null
            }
        } catch (err) {
            console.log("Error : " + err)
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
