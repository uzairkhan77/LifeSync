import express from 'express';
import {
  getTodos,getUserTodos,
  // getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  editTodo,
  comp,
  uncomp,
  getUserTodosCount
} from '../Controllers/todoController.js';



// http://localhost:4000/api/v1/todos/


const router = express.Router();


// Get all todos
router.get('/', getTodos);

//get userTasks
router.get('/:id', getUserTodos);


// Get a single todo by ID
// router.get('/:id', getTodoById);

// Create a new todo
router.post('/', createTodo);

// Update a todo by ID
router.put('/:id', updateTodo);

// comp and uncomp todos

router.get('/comp/:id', comp)
router.get('/uncomp/:id', uncomp)



router.put('/:id', editTodo);

// Delete a todo by ID
router.delete('/:id', deleteTodo);

// todos count

router.get('/count/:id', getUserTodosCount)


export default router;
