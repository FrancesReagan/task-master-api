import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default:Date.now,
  },
  user: {
    typs: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks:[{
    type: Schema.Types.ObjectId,
    ref: "Task",
  },],

});

const Project = mongoose.model("Project", projectSchema);

export default Project;