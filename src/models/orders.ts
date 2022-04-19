import client from "../database";

export type Orders = {
    id: number;
    status: number;
    userid: number;
    date: Date;
    payment: string;
    coupon: number;
}

export class OrdersStore{
    async index():Promise<Orders[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Orders> {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Orders): Promise<Orders> {
      try {
            const sql = 'INSERT INTO orders (status, userid, date, payment, coupon) VALUES($1, $2, $3, $4, $5) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.status, u.userid, u.date, u.payment, u.coupon])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Orders): Promise<Orders>{
      try {
        const sql = `UPDATE orders SET status=$1, userid=$2, date=$3, payment=$4, coupon=$5 WHERE id=$6 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.status, i.userid, i.date, i.payment, i.coupon, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Orders> {
      try {
        const sql = `DELETE FROM orders WHERE id=$1 RETURNING *;`
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