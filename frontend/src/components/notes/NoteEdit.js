import React, { useState } from 'react';

const NoteEdit = ({ id, description, handleSaveNote }) => {
  const [editedDescription, setEditedDescription] = useState(description);

  const handleChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveClick = () => {
    handleSaveNote(id, editedDescription);
  };

  return (
    <div className='note-edit'>
      <textarea
        value={editedDescription}
        onChange={handleChange}
        className='edit-textarea'
      />
      <button onClick={handleSaveClick} className='save-button'>
        Save
      </button>
    </div>
  );
};

export default NoteEdit;
