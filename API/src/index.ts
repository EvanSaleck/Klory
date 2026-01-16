import { drizzle } from "drizzle-orm/node-postgres";
import app from "./server.js";

const PORT = process.env.PORT || 3000;

export const db = drizzle(process.env.DATABASE_URL!);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server test at http://localhost:${PORT}`);
});