import express from "express";
import Project from "../models/Projects.js";
import { authMiddleware } from "../utils/auth.js";  

const router = express.Router();  

// apply authmiddleware to all routes in this file//
router.use(authMiddleware);

// GET /api/projects -- get all projects for the logged in user//
router.get("/", async (req, res)=> {
  try {
    const projects = await Project.find({ user: req.user._id })
    // add user details sans password//
    .populate("user", "username email")
    .populate("tasks", "title status createdAt");
    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

