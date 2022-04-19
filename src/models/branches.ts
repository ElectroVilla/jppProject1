import client from "../database";

export type Branches = {
    id: number;
    name: string;
    address: string;
    phone1: string;
    phone2: string;
    googlemap: string;
}

export class BranchesStore{
    async index():Promise<Branches[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM branches;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Branches> {
    try {
        const sql = 'SELECT * FROM branches WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Branches): Promise<Branches> {
      try {
            const sql = 'INSERT INTO branches (name, address, phone1, phone2, googlemap) VALUES($1, $2, $3, $4, $5) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.name, u.address, u.phone1, u.phone2, u.googlemap])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Branches): Promise<Branches>{
      try {
        const sql = `UPDATE branches SET name=$1, address=$2, phone1=$3, phone2=$4, googlemap=$5 WHERE id=$6 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.name, i.address, i.phone1, i.phone2, i.googlemap, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Branches> {
      try {
        const sql = `DELETE FROM branches WHERE id=$1 RETURNING *;`
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