import express from 'express';
import {
  getEvents,
  // getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getUserEvents
} from '../Controllers/eventController.js';

const router = express.Router();

// Get all events
router.get('/', getEvents);

// Get a single event by ID
// router.get('/:id', getEventById);

// Create a new event
router.post('/', createEvent);

// Update an event by ID
router.put('/:id', updateEvent);

// Delete an event by ID
router.delete('/:id', deleteEvent);

//specific user events
router.get("/:id", getUserEvents);

export default router;
