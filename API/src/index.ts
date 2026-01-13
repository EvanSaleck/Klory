import { drizzle } from "drizzle-orm/node-postgres";
import app from "./server.js";

const PORT = process.env.PORT || 3000;

export const db = drizzle(process.env.DATABASE_URL!);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});