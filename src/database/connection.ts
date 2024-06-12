import { Pool } from "pg"

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
})

export const query = async (text: string, params?: any[]) => {
    const client = await db.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
};

export default db