import { Pool } from "pg"

let db: Pool

if (process.env.NODE_ENV == "development") {

    db = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: 5432
    })

} else {

    db = new Pool({
        connectionString: process.env.URL,
        ssl:{
            rejectUnauthorized:false,
            requestCert: true
        }
    })

    
}

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