import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Tooltip } from "@mui/material";
const EventCard = (props) => {
  // State to control whether the edit mode is active or not for each field
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(props.title);
  const [editedStartDateTime, setEditedStartDateTime] = React.useState(
    new Date(props.startDateTime)
  );
  const [editedEndDateTime, setEditedEndDateTime] = React.useState(
    new Date(props.endDateTime)
  );
  const [editedDescription, setEditedDescription] = React.useState(
    props.description
  );

  // Event handler for handling the edit button click
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  // Event handler for handling the save button click in edit mode
  const handleSaveClick = async () => {
    // Prepare the updated event data
    const updatedEvent = {
      title: editedTitle,
      startDateTime: editedStartDateTime.toISOString(),
      endDateTime: editedEndDateTime.toISOString(),
      description: editedDescription,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/events/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Event updated successfully:", data); // The updated event data returned from the server
        props.onEventUpdate();
        // Exit edit mode after successful update
        setIsEditMode(false);
        // Call the callback function after successful update (if needed)
        // props.onEventUpdate();
      } else {
        console.error("Failed to update event:", data.error); // The error message returned from the server
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/events/${props.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Event deleted successfully:", data);
        props.setEventData((prevEventData) =>
          prevEventData.filter((event) => event._id !== props.id)
        );
        // Call the callback function after successful delete (if needed)
      } else {
        console.error("Failed to delete event:", data.error);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  

  return (
    <div>
      <div id="card" className="card my-3">
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isEditMode ? (
            <div style={{ textAlign: "center", padding: "0 20px", flex: "1" }}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "8px",
                  border: "1px solid black",
                }}
              />
            </div>
          ) : (
            <h2
              className="card-title"
              style={{ flex: "1", textAlign: "center" }}
            >
              {props.title}
            </h2>
          )}
          {isEditMode ? null : (
            <React.Fragment>
              <Tooltip title="Edit Event">
                <span onClick={handleEditClick} style={{ cursor: "pointer" }}>
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip title="Delete Event">
                <span onClick={handleDeleteClick} style={{ cursor: "pointer" }}>
                  <DeleteIcon />
                </span>
              </Tooltip>
            </React.Fragment>
          )}
        </div>

        {isEditMode ? (
          <div>
            {/* Edit mode for startDateTime */}
            <div style={{ textAlign: "center", padding: "0 20px" }}>
              <DatePicker
                selected={editedStartDateTime}
                onChange={(date) => setEditedStartDateTime(date)}
                dateFormat="yyyy-MM-dd"
                // showTimeSelect
                // timeFormat="HH:mm"
                // timeIntervals={15}
                // timeCaption="Time"
                className="form-control"
              />
            </div>

            {/* Edit mode for endDateTime */}
            <div style={{ textAlign: "center", padding: "0 20px" }}>
              <DatePicker
                selected={editedEndDateTime}
                onChange={(date) => setEditedEndDateTime(date)}
                dateFormat="yyyy-MM-dd"
                // showTimeSelect
                // timeFormat="HH:mm"
                // timeIntervals={15}
                // timeCaption="Time"
                className="form-control"
              />
            </div>

            {/* Edit mode for description */}
            <div style={{ textAlign: "center", padding: "0 20px" }}>
              <textarea
                rows="2"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                style={{
                  width: "90%",
                  maxWidth: "90%",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "3px",
                  border: "1px solid black",
                  padding: "5px",
                }}
              />
            </div>
            <button
              className="my-3"
              onClick={handleSaveClick}
              style={{
                backgroundColor: "#8758ff",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "14px",
                padding: "10px 0",
                width: "18%",
                fontFamily: "Open Sans, sans-serif",
                marginTop: "10px",
                marginBottom: "0px",
                cursor: "pointer",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            {/* Display mode for startDateTime */}
            <p
              className="card-text"
              style={{ color: "green" }}
            >{`${props.startDateTime} to ${props.endDateTime}`}</p>
            <h4 className="card-text">Description:</h4>
            {/* Display mode for description */}
            <p className="card-text my-3">{props.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
