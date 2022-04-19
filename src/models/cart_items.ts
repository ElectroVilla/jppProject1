import client from "../database";

export type cartItems = {
    id: number;
    qty: number;
    productid: number;
    orderid: number;
}

export class CartItemsStore{
    async index():Promise<cartItems[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM cart_items;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<cartItems> {
    try {
        const sql = 'SELECT * FROM cart_items WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: cartItems): Promise<cartItems> {
      try {
            const sql = 'INSERT INTO cart_items (qty, productid, orderid) VALUES($1, $2, $3) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.qty, u.productid, u.orderid])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: cartItems): Promise<cartItems>{
      try {
        const sql = `UPDATE cart_items SET qty=$1, productid=$2, orderid=$3 WHERE id=$4 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.qty, i.productid, i.orderid, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<cartItems> {
      try {
        const sql = `DELETE FROM cart_items WHERE id=$1 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const record = result.rows[0]
        conn.release()
        return record
      } catch (err) {
          throw new Error(`Could not delete record ${id}. Error: ${err}`)
      }
  }
}