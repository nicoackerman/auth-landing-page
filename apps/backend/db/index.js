import mysql from "mysql2/promise";
import "dotenv/config";

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_ADMIN_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}
