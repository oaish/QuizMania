import mysql from "mysql2/promise"
require('dotenv').config()
// create the connection to database
console.log("connecting to database...")
const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log("connected to database")

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


