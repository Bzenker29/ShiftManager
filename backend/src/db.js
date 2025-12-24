import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

db.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.error("🚨 Database connection error:", err);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);
