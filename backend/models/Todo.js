import mongoose from "mongoose";

// Task/To-do list item Schema
const todoSchema = new mongoose.Schema({
  userId: {
    type: String
 },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", todoSchema);
