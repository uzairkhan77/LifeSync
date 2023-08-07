import express from 'express';
import {
  // createNews,
  getAllNews,
  getNewsById,
  // fetchAndStoreNews
} from '../Controllers/newsController.js';

const router = express.Router();

// Manually fetch and store news articles
// router.get("/fetch", fetchAndStoreNews); // Add this route before other routes

// Create a new news article
// router.post("/", createNews); // Just use "/"
// Get all news articles
router.get("/", getAllNews); // Just use "/"
// Get a specific news article by its ID
router.get("/:id", getNewsById); // Use "/:id" to capture the news article ID


export default router;
