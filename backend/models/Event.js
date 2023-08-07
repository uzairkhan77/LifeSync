import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    type: String
 },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    startDateTime: {
      type: Date,
      required: true
    },
    endDateTime: {
      type: Date,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isPinned:{
      type:Boolean,
      default: false,
    }
  });

  export default mongoose.model('Event', eventSchema);