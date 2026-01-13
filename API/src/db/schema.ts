import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    userID: serial("user_id").primaryKey().notNull(),
    email: text("email").notNull(),
    username: text("username").notNull(),
});