import Todo from '../models/Todo.js';


// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserTodosCount = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the query parameters
  console.log('userId:', userId); // Add this line for debugging

  try {
    const todosCount = await Todo.countDocuments({ userId });
    console.log('todosCount:', todosCount); // Add this line for debugging
    res.json({ count: todosCount });
  } catch (error) {
    console.error('Error fetching todos count:', error); // Add this line for debugging
    res.status(500).json({ error: 'Unable to fetch todos count' });
  }
};


export const comp = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the query parameters
    const completedTasksCount = await Todo.countDocuments({ isDone: true, userId });
    res.json({ count: completedTasksCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uncomp = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the query parameters
    const notCompletedTasksCount = await Todo.countDocuments({ isDone: false, userId });
    res.json({ count: notCompletedTasksCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};




// Get a single todo by ID
// export const getTodoById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findById(id);
    
//     if (!todo) {
//       return res.status(404).json({ success: false, message: 'Todo not found' });
//     }

//     res.status(200).json({ success: true, data: todo });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



 //getUserTodos
 export const getUserTodos = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the query parameters

  try {
    const userTodos = await Todo.find({ userId });

    if (!userTodos || userTodos.length === 0) {
      return res.status(404).json({ success: false, message: "User task not found!" });
    }

    res.status(200).json({ success: true, message: "Successful!", data: userTodos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};


// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { userId, task, completed, isEditing, isDone } = req.body;
    const todo = new Todo({
      userId,
      task,
      completed,
      isEditing,
      isDone,
    });

    const newTodo = await todo.save();
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a todo by ID
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed, isEditing, isDone, isPinned } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, completed, isEditing, isDone, isPinned },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a todo by ID
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: deletedTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const editTodo = async (task, id) => {
  try {
    await updateTodo({
      id,
      task,
      completed: false,
      isEditing: false,
      isDone: false,
    });


  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

