import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/get-users.js";
import addUsersRouter from "./routes/add-users.js";

dotenv.config();

const app: express.Application = express();
app.use(express.json());

// routes
app.use("/get-users", usersRouter);
app.use("/add-users", addUsersRouter);

// error middleware global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
