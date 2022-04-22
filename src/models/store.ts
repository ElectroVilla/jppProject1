import client from "../database";
import { Orders, OrdersStore } from "./orders";
import { cartItems } from "./cart_items";
import { Products } from "./products";
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
    async getAdmin(): Promise<Orders>{
        try {
            const conn = await client.connect()
            const sql = 'select (SELECT count(*) FROM users where auth=2) as "Clients", (SELECT count(*) FROM users where auth=1) as "Admins", (SELECT count(*) FROM orders where status=0) as "Carts", (SELECT count(*) FROM orders where status=1) as "Pending", (SELECT count(*) FROM orders where status=2) as "Processing", (SELECT count(*) FROM orders where status=3) as "Shipped", (SELECT count(*) FROM orders where status=4) as "Delivered", (SELECT count(*) FROM orders where status=5) as "Cancelled", (SELECT count(*) FROM products) as "Products", (SELECT count(*) FROM categories) as "Categories", (SELECT count(*) FROM brands) as "Brands", (SELECT count(*) FROM branches) as "Branches", (SELECT count(*) FROM coupons) as "Coupons";'
            const result = await conn.query(sql)
            const admin = result.rows[0]
            conn.release()
            return admin
        } catch (err) {
            throw new Error(`Could not collect admind data. Error: ${err}`)
        }
    }

    async search(key: string): Promise<Products[]>{
        try {
            const conn = await client.connect()
            const par = '%' + key + '%'
            const sql = 'SELECT * FROM products WHERE (lower(name) || lower(description) || lower(tag)) like lower($1);'
            const result = await conn.query(sql, [par])
            const search = result.rows
            conn.release()
            return search
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
    //select * from products where price>200 and price<580 and category=3;
    async filter(pmin: number, pmax: number, cat: number, brand: number):Promise<Products[]>{
        try {
            let qt = ""
            let useAnd = ""
            if (pmin > pmax) {
                throw new Error('Min price is greater than max price')
            }
            if (pmin < 0 || pmax < 0) {
                throw new Error('Price cannot be negative')
            }
            if (cat < 0 || brand < 0) {
                throw new Error('Category or brand cannot be less than 0')
            }
            if (pmin > 0) {
                qt += 'price>=' + pmin
                useAnd = ' and '
            }
            if (pmax > 0) {
                qt += useAnd + 'price<=' + pmax
                useAnd = ' and '
            }
            if (cat > 0) {
                qt += useAnd + 'category=' + cat
                useAnd = ' and '
            }
            if (brand > 0) {
                qt += useAnd + 'brand=' + brand
                useAnd = ' and '
            }
            if (pmin != 0 || pmax != 0 || cat != 0 || brand != 0) {
                qt = ' where ' + qt 
            }
            const conn = await client.connect()
            const sql = 'SELECT * FROM products' + qt + ';'
            const result = await conn.query(sql)
            const products = result.rows
            conn.release()
            return products            
        } catch (err) {
            console.log("Error : " + err)
            throw new Error(`Could not find record. Error: ${err}`)
        }
    }

    async orderProducts(pid: number, qty: number, uid: number): Promise<{order:Orders, cart:cartItems} | null>{
        try {
            let order:Orders
            const now = new Date()
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (status, userid, date, payment, coupon) VALUES(1, $1, $2, \'Not Defined\', 1) RETURNING *;'
            const result = await conn.query(sql, [uid, now])
            order = result.rows[0]
            const id = order['id']
            console.log(order)
            const sql2 = 'INSERT INTO cart_items (qty, productid, orderid) VALUES($1, $2, $3) RETURNING *;'
            const result2 = await conn.query(sql2, [qty, pid, id])
            const cart = result2.rows[0]
            conn.release()
            return {order, cart}
        } catch (err) {
            console.log("Error : " + err)
            return null
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
