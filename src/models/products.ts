import client from "../database";
import { Images } from "./images";
import { Review } from "./reviews";

export type Products = {
    id: number;
    name: string;
    coverimage: string;
    description: string;
    price: number;
    introductiondate: Date;
    brand: number;
    category: number;
    featured: number;
    new: number;
    review: number;
    tag: string;
}
export class ProductsStore{
    async index():Promise<Products[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get records ${error}`)
        }
    }
    async show(id: number): Promise<Products> {
    try {
        const sql = 'SELECT * FROM products WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }
  async create(u: Products): Promise<Products> {
      try {
            const sql = 'INSERT INTO products (name, coverimage, description, price, introductiondate, brand, category, featured, new, review, tag) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.name, u.coverimage, u.description, u.price, u.introductiondate, u.brand, u.category, u.featured, u.new, u.review, u.tag])
            const record = result.rows[0]
            conn.release()
            return record
      } catch (err) {
          throw new Error(`Could not add new record ${u.id}. Error: ${err}`)
      }
  }
  async update(i: Products): Promise<Products>{
      try {
        const sql = `UPDATE products SET name=$1, coverimage=$2, description=$3, price=$4, brand=$5, category=$6, featured=$7, new=$8, review=$9, tag=$10 WHERE id=$11 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [i.name, i.coverimage, i.description, i.price, i.brand, i.category, i.featured, i.new, i.review, i.tag, i.id])
        const updatedRecord = result.rows[0]
        conn.release()
        return updatedRecord
      } catch (err) {
          throw new Error(`Could not update record ${i.id}. Error: ${err}`)
      }
  }
  async delete(id: number): Promise<Products> {
      try {
        const sql = `DELETE FROM products WHERE id=$1 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const record = result.rows[0]
        conn.release()
        return record
      } catch (err) {
          throw new Error(`Could not delete record ${id}. Error: ${err}`)
      }
  }
  async images(id:number): Promise<{product:Products, images:Images[]}> {
      try {
        const sql = 'SELECT * FROM products WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const product = result.rows[0]
        const sql2 = 'SELECT * FROM images WHERE productid=($1);'
        // const conn = await client.connect()
        const result2 = await conn.query(sql2, [id])
        const images = result2.rows        
        conn.release()
        return {product, images}
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }
  async review(id:number): Promise<{product:Products, reviews:Review[]}> {
      try {
        const sql = 'SELECT * FROM products WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const product = result.rows[0]
        const sql2 = 'SELECT reviews.id, reviews.product, reviews.stars, reviews.comments, reviews.user as "user_id", users.first_name as "user_name" FROM reviews, users WHERE product=($1) and reviews.user=users.id;'
        const result2 = await conn.query(sql2, [id])
        const reviews = result2.rows        
        conn.release()
        return {product, reviews}
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async full(id:number): Promise<{product:Products, images:Images[], reviews:Review[]}> {
      try {
        const sql = 'SELECT * FROM products WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const product = result.rows[0]
        const sql2 = 'SELECT reviews.id, reviews.product, reviews.stars, reviews.comments, reviews.user as "user_id", users.first_name as "user_name" FROM reviews, users WHERE product=($1) and reviews.user=users.id;'
        const result2 = await conn.query(sql2, [id])
        const reviews = result2.rows
        const sql3 = 'SELECT * FROM images WHERE productid=($1);'
        const result3 = await conn.query(sql3, [id])
        const images = result3.rows
        conn.release()
        return {product, images, reviews}
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async new(): Promise<Products[]> {
      try {
        const sql = 'SELECT * FROM products WHERE new=1;'
        const conn = await client.connect()
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    } catch (err) {
        throw new Error(`Could not find records. Error: ${err}`)
    }
  }
  async featured(): Promise<Products[]> {
      try {
        const sql = 'SELECT * FROM products WHERE featured=1;'
        const conn = await client.connect()
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    } catch (err) {
        throw new Error(`Could not find records. Error: ${err}`)
    }
  }

}