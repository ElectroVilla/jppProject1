import client from "../database";

export type Carousel = {
    id: number;
    image: string;
	havelink: number;
    link: string;
}

export class CarouselStore{
    async index():Promise<Carousel[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM carousel;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Carousel> {
    try {
        const sql = 'SELECT * FROM carousel WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Carousel): Promise<Carousel> {
      try {
            const sql = 'INSERT INTO carousel (image, havelink, link) VALUES($1, $2, $3) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.image, u.havelink, u.link])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Carousel): Promise<Carousel>{
      try {
        const sql = `UPDATE carousel SET image=$1, havelink=$2, link=$3 WHERE id=$4 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.image, i.havelink, i.link, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Carousel> {
      try {
        const sql = `DELETE FROM carousel WHERE id=$1 RETURNING *;`
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