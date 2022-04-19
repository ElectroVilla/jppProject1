import client from "../database";

export type Brands = {
    id: number;
    name: string;
    origin: string;
}

export class BrandsStore{
    async index():Promise<Brands[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM brands;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Brands> {
    try {
        const sql = 'SELECT * FROM brands WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Brands): Promise<Brands> {
      try {
            const sql = 'INSERT INTO brands (name, origin) VALUES($1, $2) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.name, u.origin])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Brands): Promise<Brands>{
      try {
        const sql = `UPDATE brands SET name=$1, origin=$2 WHERE id=$3 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.name, i.origin, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Brands> {
      try {
        const sql = `DELETE FROM brands WHERE id=$1 RETURNING *;`
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