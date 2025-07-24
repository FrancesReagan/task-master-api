// Project Create Read Update Delete with .populate ("tasks")//

import express from "express";
import Project from "../models/Projects.js";
import Task from "../models/Tasks.js";
import { authMiddleware } from "../utils/auth.js";  

const router = express.Router();  

// authmiddleware applied to all routes//
router.use(authMiddleware);

// GET /api/projects -- retreive all projects for the logged in user//
router.get("/", async (req, res)=> {
  try {
    const projects = await Project.find({ user: req.user._id })
    // add user details sans password//
    .populate("user")
    .populate("tasks");
    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET  /api/projects/:id  --retrieve a single projectby ID...includes all task details//
router.get("/:id", async (req,res)=> {
  try {
    const project = await Project.findById(req.params.id) 
    .populate("user")
    // brings all task details//
    .populate("tasks");

    if(!project) {
      return res.status(404).json({ message: "Can not find this project ID"});
    }

    // auth check//
    if (project.user._id.toString()!==req.user._id.toString()) {
      return res.status(403).json({ message: "Authorization failed...User can't not access this Project"});
    }
    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST  /api/projects - to create a new project
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user._id,
      tasks: []
    });
    // User info is populated for the response//
    await project.populate("user");
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json(error);
  }
});