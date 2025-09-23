import mysql from "mysql2/promise";
import "dotenv/config";
import fs from "fs";
import path from "path";

if (!process.env.DB_SSL_CA_ROUTE)
  throw Error("DB_SSL_CA_ROUTE env variable was not define");
if (!process.env.DB_HOST) throw Error("DB_HOST env variable was not define");
if (!process.env.DB_ADMIN_USER)
  throw Error("DB_ADMIN_USER env variable was not define");
if (!process.env.DB_PASSWORD)
  throw Error("DB_PASSWORD env variable was not define");
if (!process.env.DB_NAME) throw Error("DB_NAME env variable was not define");

export async function stablishSecureConnection() {
  try {
    // Gets the ca.pem file route and checks if it exists on the current file directory
    const caFileRoute = process.env.DB_SSL_CA_ROUTE;
    if (!fs.existsSync(path.resolve(caFileRoute))) {
      throw new Error(
        `The CA certificate file was not found on route: ${caFileRoute}`
      );
    }

    // Reads the ssl certicate and encodes it using the right format
    // Parse the port variable to int (as it is what's expected for the db)
    const caCertificate = fs.readFileSync(path.resolve(caFileRoute), "utf-8");
    const dbPort = parseInt(process.env.DB_PORT, 10);
    
    const connectionOptions = {
      host: process.env.DB_HOST,
      user: process.env.DB_ADMIN_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: dbPort,
      ssl: {
        ca: caCertificate,
      },
    };

    console.log("Initiating connection with db...", {
      ...connectionOptions,
      password: "****",
      ca: "succesfully loaded",
    });

    const connection = await mysql.createConnection(connectionOptions);

    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}
