// Project Create Read Update Delete with .populate ("tasks")//

import express from "express";
import Project from "../models/Projects.js";
import { authMiddleware } from "../utils/auth.js";  

const router = express.Router();  

// authmiddleware applied to all routes//
router.use(authMiddleware);

// GET /api/projects -- retreive all projects for the logged in user//
router.get("/", async (req, res)=> {
  try {
    const projects = await Project.find({ user: req.user._id })
    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET  /api/projects/:id  --retrieve a single projectby ID...checking if user owns project as well//
router.get("/:id", async (req,res)=> {
  try {
    const project = await Project.findById(req.params.id) 
    
    if(!project) {
      return res.status(404).json({ message: "Can not find this project ID"});
    }

    // authorization or seeing if user owns this projeect ---check//
    if (project.user.toString()!==req.user._id.toString()) {
      return res.status(403).json({ message: "Authorization failed...User can't not access this Project"});
    }
    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST  /api/projects - to create a new project//
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      // set the owner from auth. user//
      user: req.user._id,
      // tasks: []
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT  /api/projects/:id  - to update a project with auth user check//
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
   if (!project) {
    return res.status(400).json({ message: "Could not find a project by the id you provided"});
   }
  //  auth check//
  if (project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Authorization failed....you can not update this project."});
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true}
  );
  
  res.json(updatedProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE /api/projects/:id  - delete a project with auth check//
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Unable to find a project with that id"});
    }
// auth check//
if (project.user.toString()!== req.user._id.toString()) {
  return res.status(403).json({ message: "Authorization failed..you can not delete this project."});
}

await Project.findByIdAndDelete(req.params.id);
res.json({ message: "Project has been deleted."});
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;