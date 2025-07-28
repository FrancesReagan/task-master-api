// main entry point//
import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import usersRouter  from "./routes/users.js";
import projectRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";

// load env variables form .env//
dotenv.config();

// create express app//
const app = express();
const PORT = process.env.PORT || 3000;

// middleware used to parse JSON and URL encoded data//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// simple frontend//
app.use(express.static('simple-frontend'));

// route handlers -- mounting//
app.use("/api/users", usersRouter);
app.use("/api/projects", projectRouter);
// this route handler ---is just /api endpoint as in my task routes I already define the full paths ----example---in the tasks.js I have /projects/:projectId/tasks and 
// /tasks/:taskId//
app.use("/api", tasksRouter);

// default route for API successful deployment message//
app.get("/", (req, res) => {
  res.send(`<h1> Task Manager API</h1>
    <p> API is running successfully</p>
    <p><a href="/api/projects">TEST API</a></p>
    `)
});

// database connection---the app.listen() is inside the database connection callback in order to ensure the server only starts AFTER the database is connected//
db.once("open", () => {
app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}`));
});


export default app;

// note: my final API endpoints are:
// /api/users/* -- from usersRouter//
// /api/projects/* --from projectRouter//
// /api/projects/:projectId/tasks from tasksRouter//
// /api/tasks/:taskId from taskRouter//