import React, { useState } from "react";
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Tooltip from "@mui/material/Tooltip";


const ContactItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedEmail, setUpdatedEmail] = useState(props.email);
  const [updatedNumber, setUpdatedNumber] = useState(props.number);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  // const handleFavoriteToggle = () => {
  //   setIsFavorite(!isFavorite);
  //   handleUpdateFavourite()
  // };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Contact deleted successfully.');
        // Call the callback function after successful deletion
        props.onContactDelete();
      } else {
        console.error('Failed to delete contact.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateSubmit = async () => {
    // Prepare the updated contact data
    const updatedContact = {
      name: updatedTitle,
      email: updatedEmail,
      phone: updatedNumber,
    };

    try {
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (response.ok) {
        console.log('Contact updated successfully.');
        // Exit edit mode after successful update
        setIsEditing(false);
        // Call the callback function after successful update
        props.onContactUpdate();
      } else {
        console.error('Failed to update contact.');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleUpdateFavourite = async () => {
    // Toggle the isFavorite state
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  
    // Prepare the updated contact data with the favorite status
    const updatedContact = {
      name: updatedTitle,
      email: updatedEmail,
      phone: updatedNumber,
      isFavourite: !isFavorite, // Toggle the favorite status
    };
  
    try {
      // Call the API endpoint to update the favorite status
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });props.onContactUpdate()
  
      if (response.ok) {
        console.log('Toggled favorite status successfully.');
        // The API call was successful, you can optionally refresh the contact list
        // or perform other actions as needed.
        // props.onContactUpdate();
      } else {
        console.error('Failed to toggle favorite status.');
        // If the API request fails, revert the isFavorite state
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      // If there's an error, revert the isFavorite state
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    }
  };
  
  

  return (
    <div>
      <div id="card" className="card my-3 card-custom">
        <div className="container">
          {isEditing ? (
            <><p className="mt-4">Name</p>
              <input
                type="text"
                className="card-title "
                style={{ textAlign: "left" }}
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              /><p className="mt-4">Email</p>
              <input
                type="text"
                className="card-text"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              /><p className="mt-4">Contact No</p>
              <input
                type="text"
                className="card-text"
                value={updatedNumber}
                onChange={(e) => setUpdatedNumber(e.target.value)}
              />
              <button
                className="btn btn-primary my-4"
                style={{alignItems: "center"}}
                onClick={handleUpdateSubmit}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <img style={{padding:'30px'}}
                src="https://cdn2.iconfinder.com/data/icons/smiles-business/512/1041_boy_c-512.png"
                className="card-img-top my-2"
                alt="..."
              />
              <h5 className="card-title mb-3 my-3" style={{ textAlign: "center", fontWeight: 'bold' }}>
                {props.title}
              </h5>
              <p className="card-text"><b>Email</b>: {props.email}</p>
              <p className="card-text"><b>Number</b>: {props.number}</p>
              <p className="card-text">
                <small className="text-muted">
                  {`Date: ${new Date().toLocaleDateString()}`}
                </small>
              </p>
            </>
          )}


          <div className="d-flex justify-content-end" style={{padding:'4px', gap:'6px'}} >
            
                {isEditing ? null : (
              <>{/* Heart Icon */}
              {isFavorite ? (
                <FaHeart
                  className="text-danger"
                  style={{ fontSize: "25px", cursor: 'pointer' }}
                  onClick={handleUpdateFavourite}
                />
              ) : (
                <FaRegHeart
                  className="text-danger"
                  style={{ fontSize: "25px", cursor: 'pointer' }}
                  onClick={handleUpdateFavourite}
                />
              )}

                  <RiEdit2Line
                    className="text-primary"
                    style={{ fontSize: "25px", cursor: 'pointer', marginRight: '3px' }}
                    onClick={handleEdit}
                  />{/* Edit Icon */}
                  
                  {/* Delete Icon with Tooltip */}

                  <RiDeleteBinLine
                    className="text-danger"
                    style={{ fontSize: "25px", cursor: 'pointer', marginRight: '5px' }}
                    onClick={handleDelete}
                  />


              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
