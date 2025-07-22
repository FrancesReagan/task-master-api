import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
description: {
  type: String,
  required: true,
  trim: true,
},
status: {
  type: String,
  required: true,
  enum: ["To Do", "In Progress", "Done"],
  default: "To Do",
},
createdAt: {
  type: Date,
  
}

})