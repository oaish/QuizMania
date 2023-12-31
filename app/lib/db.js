import mysql from "mysql2/promise"

// create the connection to database
const connection = await mysql.createConnection(process.env.DATABASE_URL);

export default async function executeQuery(query, values) {
    try {
        const [rows] = await connection.execute(query,values);
        return rows
    }
    catch (e) {
        console.error(e)
        return null;
    }
}


