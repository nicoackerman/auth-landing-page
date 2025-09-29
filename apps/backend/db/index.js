import mysql from "mysql2/promise";
import "dotenv/config";
import fs from "fs";
import path from "path";
const {
  DB_SSL_CA_ROUTE,
  DB_HOST,
  DB_ADMIN_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = process.env;

if (!DB_SSL_CA_ROUTE)
  throw Error("DB_SSL_CA_ROUTE env variable was not define");
if (!DB_HOST) throw Error("DB_HOST env variable was not define");
if (!DB_ADMIN_USER) throw Error("DB_ADMIN_USER env variable was not define");
if (!DB_PASSWORD) throw Error("DB_PASSWORD env variable was not define");
if (!DB_NAME) throw Error("DB_NAME env variable was not define");

export async function stablishSecureConnection() {
  try {
    // Gets the ca.pem file route and checks if it exists on the current file directory
    const caFileRoute = DB_SSL_CA_ROUTE;
    if (!fs.existsSync(path.resolve(caFileRoute))) {
      throw new Error(
        `The CA certificate file was not found on route: ${caFileRoute}`
      );
    }

    // Reads the ssl certicate and encodes it using the right format
    // Parse the port variable to int (as it is what's expected for the db)
    const caCertificate = fs.readFileSync(path.resolve(caFileRoute), "utf-8");
    const dbPort = parseInt(DB_PORT, 10);

    const connectionOptions = {
      host: DB_HOST,
      user: DB_ADMIN_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: dbPort,
      connectionLimit: 10,
      waitForConnections: true,
      ssl: {
        ca: caCertificate,
      },
    };

    console.log("Initiating connection with db...", {
      host: DB_HOST,
      user: DB_ADMIN_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      password: "****",
      ca: "succesfully loaded",
    });

    const connection = await mysql.createPool(connectionOptions);

    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}
