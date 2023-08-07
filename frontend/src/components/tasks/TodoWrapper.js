import React, { useState, useEffect,useContext } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { AuthContext } from '../../context/AuthContext';
import Button from '@mui/material/Button';
// import { SnackbarProvider, useSnackbar } from 'notistack';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);
   // Function to get pinned tasks from the todos array
   const getPinnedTasks = () => todos.filter((todo) => todo.isPinned);

   // Function to get non-pinned tasks from the todos array
   const getNonPinnedTasks = () => todos.filter((todo) => !todo.isPinned);

   //check if it has pinned tasks
   const hasPinnedTasks = getPinnedTasks().length > 0;
   const hasUnPinnedTasks = getNonPinnedTasks().length > 0;


  // Fetch all todos from the API when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch all todos from the API
  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/todos/${user._id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
 
  

  const addTodo = async (todo) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          task: todo,
          completed: false,
          isEditing: false,
          isDone: false,
          isPinned: false
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTodos([...todos, data.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/todos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } else {
      console.error('Error deleting todos:', data.message);
    }
  } catch (error) {
    console.error('Error deleting todos:', error);
  }
};


  const editTodo = async (task, id) => {
    try {
      await fetch(`http://localhost:4000/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });
  
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, task } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  
  

  const doneTodo = async (id) => {
    try {
      const updatedTodo = todos.find((todo) => todo._id === id);
      updatedTodo.isDone = !updatedTodo.isDone;

      await fetch(`http://localhost:4000/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, isDone: updatedTodo.isDone } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handlePinned = async (id) => {
    try {
      const updatedTodo = todos.find((todo) => todo._id === id);
      updatedTodo.isPinned = !updatedTodo.isPinned;

      await fetch(`http://localhost:4000/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, isPinned: updatedTodo.isPinned } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="TodoWrapper">
      <div className="my-4" style={{ textAlign: "center" }}>
        <h1>Get Things Done !</h1>
        <TodoForm addTodo={addTodo} />
      </div>

      {/* Render Pinned Tasks */}
      <div>
      {hasPinnedTasks && (
        <h1 style={{ textAlign: "left", fontSize: '15px', marginLeft: "10px" }}>
          Pinned Tasks
        </h1>
      )}
        {getPinnedTasks().map((todo) => (
          todo.isEditing ? (
            <EditTodoForm key={todo._id} editTodo={editTodo} task={todo} />
          ) : (
            <Todo
              key={todo._id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              doneTodo={doneTodo}
              handlePinned={handlePinned}
            />
          )
        ))}
      </div>

      {/* Render Other Tasks */}
      <div>
      {hasUnPinnedTasks && hasPinnedTasks && (
        <h1 style={{ textAlign: "left", fontSize: '15px', marginLeft: "10px" }}>
          All Tasks
        </h1>
        
      )}
        {getNonPinnedTasks().map((todo) => (
          todo.isEditing ? (
            <EditTodoForm key={todo._id} editTodo={editTodo} task={todo} />
          ) : (
            <Todo
              key={todo._id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              doneTodo={doneTodo}
              handlePinned={handlePinned}
            />
          )
        ))}
      </div>
    </div>
  );
};
