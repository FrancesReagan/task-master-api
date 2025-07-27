// Task Create Read Update Delete with bidirectional syncing-- creating and deleting tasks (if all goes right) will update the project arrays--cool //
// and in the schema files --Project -> Task and Task-> Project references ---which will give abilities of what I listed above ---//

import express from "express";
import Task from "../models/Tasks.js";
import Project from "../models/Projects.js";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

// authMiddle for all routes//
router.use(authMiddleware);

// POST to create task for a particular project --- endpoint: /api/projects/:productId/tasks ---//
router.post("/projects/:projectId/tasks", async (req,res) => {
  
try {
 const { projectId } = req.params;

//  find project and then auth check if it does belong to logged in user//
const project = await Project.findById(projectId);

 if(!project) {
  return res.status(400).json({ message: "Project could not be found"});
 }

 if (project.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "You are not allowed to access this..."});
 }

//  to create a task//
const task = await Task.create({
  ...req.body,
  project: projectId,
});
res.status(201).json(task);
} catch (error) {
  res.status(400).json(error);
}
});


// GET /api/projects/:projectId/tasks ----this is to get all tasks for a particular project//
router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const { projectId } = req.params;

    // find and then authenticate user //
const project = await Project.findById(projectId);
if(!project) {
  return res.status(404).json({ message:"Access not granted"});
}
// retrieve or get all projects for this particular project//
const tasks = await Task.find({ project: projectId });
    res.json(tasks);

  } catch (error) {
    res.status(500).json(error);
  }
});

// GET  /api/tasks/:id  - retrieve a single task by its ID//
router.get("/:id", async (req,res) => {
  try {
    const task = await Task.findById(req.params.id)
    .populate("project");

    if(!task) {
      return res.status(404).json({ message: "Requested id has no task associated with it"})
    }
    if(!task.project) {
      return res.status(404).json({ message: "Associated arent project not found"});
    }
    // auth check//
    if (task.project.user.toString !== req.user._id.toString()) {
      return res.status(403).json ({ message: "Authorization failed..You can not access this task." });
    }  
    res.json(task);
  } catch  (error) {
    res.status(500).json(error);
  }
});
