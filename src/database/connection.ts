import { Pool } from "pg"

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
})

export default db

const { query } = db

export { query }