import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  source: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  publishedAt: {
    type: Date,
  },
  content: {
    type: String,
  },
});

export default mongoose.model('News', NewsSchema);
