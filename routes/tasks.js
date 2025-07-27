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
// retrieve or get all tasks for this particular project//
const tasks = await Task.find({ project: projectId });
    res.json(tasks);

  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT  /api/tasks/:id  - to UPDATE the task with Authorization//
router.put("/:taskid", async (req,res) => {
  try {
   
    const { taskId } = req.params;

    // find the task and populate the project//
    const task = await Task.findById(taskId).populate("project");
    if (!task) {
      return res.status(404).json({ message : "Task is no where to be found..." });
    }

    // see if user owns the parent project of this task//
    if(task.project.user.toString() !== "req.user._id.toString"()) {
      return res.status(403).json({ message: "Sorry you don't have rights to access"})
    }

    // to update a task//
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.json( updatedTask );
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete  /api/tasks/:taskid --delete task  by task ID and to do that have to have correct authorization--otherwise denied ability to delete that task//
// LOGIC this says -- using the router.delete function to find a task by its ID---asyncronous set up---for the request from user to the response from database--this function try
// find the object called taskId in the request parameters---give time or await to find the task by that taskid using the findById--once found populate that task in 
// the associated project-----if the task is not found by the task id--return to the user the error message 404 with detailed message "Task not found in the project"
router.delete("/:taskId", async (req,res) => {
  try {
    const { taskId } = req.params;
     // find the task and populate the project//
     const task = await Task.findById(taskId).populate("project");
     if(!task) {
      return res.status(404).json({ message: "Task not found in the project"});
     }
// Auth check--if task by that taskID is found --see if the user owns the parent project first before continuing----
// LOGIC: take task and project and user and convert to string
// on the other side of the comparsion logic !== take the requested user and their associated id and convert to string---then the comparsion logic says is the task,project, user information
// matching or different from the user and associated ID in the request -- if they are not different--then move on to next function---which will be the delete function 
// shown after the catch/error handling----if they are different--then return error of unauthorzied access --go no further //
  if (task.project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "you are not the owner of the project that contains that task---your access is denied"});
  }

  // if they do match and not different---then DELETE:) the task//
  await Task.findByIdAndUpdate(req.params.taskId);
  res.json({ message: "Task deleted successfully" });
  } catch (
   
  ) {
    
  }
})


