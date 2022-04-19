import client from "../database";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address1: string;
	address2: string;
	auth: number;
    password: string;
    status: number;
}
const pepper = process.env.PEPPER

export class UsersStore{
    async authenticate(email:string, password:string):Promise<{token:string, user:User} | null>{
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE email=($1) LIMIT 1;'
        const result = await conn.query(sql, [email])
        if (result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password+pepper, user.password)) {
                const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as Secret)
                return {token:token, user:user}
            }
        }
        return null
    }

    async index():Promise<User[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Can't get table ${error}`)
        }
    }

    async show(id: number): Promise<User> {
    try {
        const sql = 'SELECT * FROM users WHERE id=($1);'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find record ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<{token:string, user:User}> {
      try {
            const rounds = process.env.SALT_ROUNDS as string
            const salt_rounds = parseInt(rounds)
            const hash = bcrypt.hashSync(u.password + pepper, salt_rounds)
            const sql = 'INSERT INTO users (first_name, last_name, email, phone, address1, address2, auth, password, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.first_name, u.last_name, u.email, u.phone, u.address1, u.address2, u.auth, hash, u.status])
            const newUser = result.rows[0]
            const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as Secret)
            conn.release()
            return {token:token, user:newUser}
      } catch (err) {
          throw new Error(`Could not add new user ${u.email}. Error: ${err}`)
      }
  }

  async update(u: User): Promise<User>{
      try {
        const sql = `UPDATE users SET first_name=$1, last_name=$2, email=$3, phone=$4, auth=$5, status=$6 WHERE id=$7 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [u.first_name, u.last_name, u.email, u.phone, u.auth, u.status, u.id])
        const updateduser = result.rows[0]
        conn.release()
        return updateduser
      } catch (err) {
          throw new Error(`Could not update record ${u.id}. Error: ${err}`)
      }
  }
  async updatePw(id: number, password_new: string): Promise<User>{
      try {
        const rounds = process.env.SALT_ROUNDS as string
        const salt_rounds = parseInt(rounds)
        const hash = bcrypt.hashSync(password_new + pepper, salt_rounds)
        const sql = `UPDATE users SET password=$1 WHERE id=$2 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [hash, id])
        conn.release()
        return result.rows[0]
      } catch (err) {
          throw new Error(`Could not update record ${id}. Error: ${err}`)
      }
  }

  async delete(id: number): Promise<User> {
      try {
        const sql = `DELETE FROM users WHERE id=$1 RETURNING *;`
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const user = result.rows[0]
        conn.release()
        return user
      } catch (err) {
          throw new Error(`Could not delete record ${id}. Error: ${err}`)
      }
  }
}