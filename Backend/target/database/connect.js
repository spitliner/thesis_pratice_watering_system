import mysql from "mysql2";
const connectionPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 10,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    timezone: process.env.TIMEZONE,
});
export default connectionPool;
