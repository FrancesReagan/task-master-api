// Task Create Read Update Delete with bidirectional syncing-- creating and deleting tasks (if all goes right) will update the project arrays--cool //
// and in the schema files --Project -> Task and Task-> Project references ---which will give abilities of what I listed above ---//

import express from "express";
import Task from "../models/Tasks.js";
import Project from "../models/Projects.js";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

// authMiddle for all routes//
router.use(authMiddleware);

// GET  /api/tasks - retrieve all logged in user's tasks//
router.get("/", async (req, res) => {
  try {
    // discover all of the projects owned by a user//
    const userProjects = await Project.find({ user: req.user._id });
    const projectIds = userProjects.map(project => project._id);
    // for those projects discover all associated tasks//
    const tasks = await Task.find({ project: { $in: projectIds }})
    .populate("project");
    .sort({ createdAt: -1});

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
      return res.status(404).json({ message: "Parent project not found"});
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

// POST /api/tasks 