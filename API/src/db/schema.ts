import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    userID: serial("user_id").primaryKey().notNull(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    names: text("name").notNull(),
    lastname: text("lastname").notNull(),
    weight: text("weight").notNull(),
    height: text("height").notNull(),
    birthdate: text("birthdate").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const meals = pgTable("meals", {
    mealID: serial("meal_id").primaryKey().notNull(),
    userID: serial("user_id").notNull(),
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
    userID: serial("user_id").notNull(),
    date: timestamp("date").notNull(),
    totalCalories: text("total_calories").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});