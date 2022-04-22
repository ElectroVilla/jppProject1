import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()
const {HEROKU_HOST, HEROKU_DB, HEROKU_USER, HEROKU_PASSWORD,
POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, DATABASE_URL} = process.env
let client:Pool;
const environment = parseInt(process.env.ENV as string)
const en1 = 1 //"dev build"
const en2 = 2 //"test"
//psql -U postgres -h localhost -W
if (environment === 1) {// "dev"
    console.log('Loading Dev Data')
    // client = new Pool ({
    //     host: POSTGRES_HOST,
    //     database: POSTGRES_DB,
    //     user: POSTGRES_USER,
    //     password:POSTGRES_PASSWORD,
    // })   
    client = new Pool ({
        host: HEROKU_HOST,
        database: HEROKU_DB,
        user: HEROKU_USER,
        password:HEROKU_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    })         
}else{// "test"
    console.log('Loading Test Data')
    client = new Pool ({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password:POSTGRES_PASSWORD,
    })
}
export default client