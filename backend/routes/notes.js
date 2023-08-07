import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getUserNotes
} from '../Controllers/notesController.js';

const router = express.Router();

// // http://localhost:4000/api/v1/notes/

// // Public routes
router.get('/', getNotes);
router.get('/:id', getNoteById);

// Protected routes
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id',  deleteNote);

//getusernotes
router.get('/user/:id', getUserNotes);

export default router;
