import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import usersRouter  from "./routes/users.js";
import projectRouters from "./routes/projects.js";
import tasksRouters from "./routes/tasks.js";

// load env variables form .env//
dotenv.config();

// create express app//
const app = express();
const PORT = process.env.PORT || 3000;

// middleware used to parse JSON and URL encoded data//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route handlers -- mounting//
app.use("/api/users", usersRouter);
app.use("/api/projects", projectRouters);
app.use("/api/tasks", tasksRouters);

app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));

export default app;