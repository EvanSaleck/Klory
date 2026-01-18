import { pgTable, integer, serial, text, timestamp, real, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    userID: serial("user_id").primaryKey().notNull(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    name: text("name").notNull(),
    lastname: text("lastname").notNull(),
    weight: real("weight").notNull(),
    height: integer("height").notNull(),
    birthdate: date("birthdate").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const meals = pgTable("meals", {
    mealID: serial("meal_id").primaryKey().notNull(),
    userID: integer("user_id").notNull().references(() => users.userID),
    mealName: text("meal_name").notNull(),
    recipe: text("recipe"),
    calories: text("calories").notNull(),
    protein: text("protein").notNull(),
    carbs: text("carbs").notNull(),
    fats: text("fats").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
}); 

export const summarycalories = pgTable("summarycalories", {
    summaryID: serial("summary_id").primaryKey().notNull(),
    userID: integer("user_id").notNull().references(() => users.userID),
    date: timestamp("date").notNull(),
    totalCalories: text("total_calories").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});