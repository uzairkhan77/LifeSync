import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrashAlt,
  faCheckSquare,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { RiUnpinFill } from 'react-icons/ri';


export const Todo = ({
  task,
  deleteTodo,
  editTodo,
  doneTodo,
  handlePinned,
}) => {
  const [editedTask, setEditedTask] = useState(task.task);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    editTodo(editedTask, task._id);
    setIsEditing(false);
  };

  return (
    <div
      className="Todo"
      style={{
        background: task.isDone ? "rgb(95, 253, 0)" : "#8758ff",
        color: "#fff",
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="todo-input"
            style={{
              color: "#fff",
              border: "1px solid #fff",
              paddingRight: "8px",
            }}
          />
          <button
            onClick={handleSave}
            className="todo-btn todo-btn-save"
            style={{ border: "1px solid #fff", marginLeft: "8px" }}
          >
            Save
          </button>
        </div>
      ) : (
        <p className={`${task.completed ? "completed" : ""}`}>{task.task}</p>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* icons  */}
          <Tooltip title={task.isPinned ? "Unpin this Task" : "Pin this Task"}>
            {task.isPinned ? (
              <RiUnpinFill onClick={() => handlePinned(task._id)} title="Unpin this Task" />
            ) : (
              <FontAwesomeIcon icon={faThumbtack} onClick={() => handlePinned(task._id)} />
            )}
          </Tooltip>

          <Tooltip title="Mark as done">
            <FontAwesomeIcon
              icon={faCheckSquare}
              onClick={() => doneTodo(task._id)}
            />
          </Tooltip>
          {isEditing ? (
            <Tooltip title="Cancel Edit">
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => setIsEditing(false)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Edit">
              <FontAwesomeIcon icon={faPenSquare} onClick={handleEdit} />
            </Tooltip>
          )}
          {!isEditing && (
            <Tooltip title="Remove">
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => deleteTodo(task._id)}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
