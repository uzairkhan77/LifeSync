import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip component
import NoteEdit from "./NoteEdit";
import { RiUnpinFill } from "react-icons/ri";

const Note = ({
  id,
  description,
  date,
  handleDeleteNote,
  handleEditNote,
  handlePinned,
  note,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = new Date(date).toLocaleString();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveNote = (id, editedDescription) => {
    handleEditNote(id, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <NoteEdit
          id={id}
          description={description}
          handleSaveNote={handleSaveNote}
        />
      ) : (
        <>
          <span
            className="description"
            style={{ wordBreak: "break-word", overflow: "auto" }}
          >
            {description}
          </span>
          <div className="note-footer" style={{ marginTop: "15px" }}>
            <small>{formattedDate}</small>
            <div style={{ display: "flex", gap: "10px", padding: "4px" }}>
              {/* edit  */}
              <Tooltip title="Edit">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={handleEditClick}
                  className="edit-icon"
                  style={{ cursor: "pointer" }}
                  size="1x"
                />
              </Tooltip>

              {/* isPinned */}
              {/* <Tooltip title="Pin this note">
                <FontAwesomeIcon
                  icon={faThumbtack}
                  onClick={() => handlePinned(note._id)}
                  style={{ cursor: "pointer" }}
                  size="1x"
                />
              </Tooltip> */}

              <Tooltip title="Pin this note"
              >
                {note.isPinned ? (
                  <RiUnpinFill
                    onClick={() => handlePinned(note._id)}
                    title="Unpin this note"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faThumbtack}
                    onClick={() => handlePinned(note._id)}
                    
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Tooltip>

              {/* delete  */}

              <Tooltip title="Delete">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => handleDeleteNote(id)}
                  className="delete-icon"
                  size="1x"
                />
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
