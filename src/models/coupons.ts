import client from "../database";

export type Coupons = {
    id: number;
    name: string;
	available: number;
	validtille: Date;
	discounttype: number;
	discountvalue: number;
	minorder: number;
}

export class CouponsStore{
    async index():Promise<Coupons[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM coupons;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Coupons> {
    try {
        const sql = 'SELECT * FROM coupons WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Coupons): Promise<Coupons> {
      try {
            const sql = 'INSERT INTO coupons (name, available, validtille, discounttype, discountvalue, minorder) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.name, u.available, u.validtille, u.discounttype, u.discountvalue, u.minorder])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Coupons): Promise<Coupons>{
      try {
        const sql = `UPDATE coupons SET name=$1, available=$2, validtille=$3, discounttype=$4, discountvalue=$5, minorder=$6 WHERE id=$7 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.name, i.available, i.validtille, i.discounttype, i.discountvalue, i.minorder, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Coupons> {
      try {
        const sql = `DELETE FROM coupons WHERE id=$1 RETURNING *;`
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