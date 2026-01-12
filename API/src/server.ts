import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";

dotenv.config();

const app = express();
app.use(express.json()); // parse JSON bodies

// routes
app.use("/users", usersRouter);

// error middleware global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
