import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
    
    {userId: {
        type: String
     },
    title:{
        type: String,
        // required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
    isPinned:{
        type:Boolean,
        default: false,
      }
  });

  export default mongoose.model('Note', NotesSchema);