import client from "../database";

export type Review = {
    id: number;
    product: number;
    stars: number;
    comments: string;
    user: number;
}

export class ReviewStore{
    async index():Promise<Review[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT reviews.id, reviews.product, reviews.stars, reviews.comments, reviews.user as "user_id", users.first_name as "user_name" FROM reviews, users WHERE reviews.user=users.id;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }

    async show(id: number): Promise<Review> {
    try {
        // const sql = 'SELECT * FROM reviews WHERE id=($1);'
        const sql = 'SELECT reviews.id, reviews.product, reviews.stars, reviews.comments, reviews.user as "user_id", users.first_name as "user_name" FROM reviews, users WHERE reviews.id=($1) and reviews.user=users.id;'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: Review): Promise<Review> {
      console.log(u)
      try {
            const sql = 'INSERT INTO reviews (product, stars, comments, "user") VALUES($1, $2, $3, $4) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.product, u.stars, u.comments, u.user])
            const record = result.rows[0]
            const sql2 = 'select avg(stars)::numeric(10,2) from reviews where product=$1;';
            const result2 = await conn.query(sql2, [u.product])
            const avg = result2.rows[0]['avg']
            const sql3 = `UPDATE products SET review=$1 WHERE id=$2 RETURNING *;`
            const result3 = await conn.query(sql3, [avg, u.product])
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }

  async update(i: Review): Promise<Review>{
      try {
        const sql = `UPDATE reviews SET product=$1, stars=$2, comments=$3, user=$4 WHERE id=$5 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.product, i.stars, i.comments, i.user, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Review> {
      try {
        const sql = `DELETE FROM reviews WHERE id=$1 RETURNING *;`
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