import client from "../database";

export type Images = {
    id: number;
    imagename: string;
    productid: number;
}

export class ImagesStore{
    async index():Promise<Images[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM images;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Images> {
    try {
        const sql = 'SELECT * FROM images WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Images): Promise<Images> {
      try {
            const sql = 'INSERT INTO images (imagename, productid) VALUES($1, $2) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.imagename, u.productid])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Images): Promise<Images>{
      try {
        const sql = `UPDATE images SET imagename=$1, productid=$2 WHERE id=$3 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.imagename, i.productid, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Images> {
      try {
        const sql = `DELETE FROM images WHERE id=$1 RETURNING *;`
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