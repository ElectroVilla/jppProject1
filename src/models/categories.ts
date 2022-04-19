import client from "../database";

export type Category = {
    id: number;
    name: string;
}

export class CategoriesStore{
    async index():Promise<Category[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM categories;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Category> {
    try {
        const sql = 'SELECT * FROM categories WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Category): Promise<Category> {
      try {
            const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.name])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Category): Promise<Category>{
      try {
        const sql = `UPDATE categories SET name=$1 WHERE id=$2 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.name, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Category> {
      try {
        const sql = `DELETE FROM categories WHERE id=$1 RETURNING *;`
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