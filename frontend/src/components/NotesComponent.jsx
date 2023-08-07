import { useState, useEffect, useContext } from 'react';
import NotesList from './notes/NotesList';
import Search from './notes/Search';
import './notes/notes.css';
import { AuthContext } from '../context/AuthContext';

const NotesComponent = () => {
  const [notes, setNotes] = useState([]);
  const [notesData, setNotesData] = useState([])
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(AuthContext);



  // get API
  const fetchNotes = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/notes/user/${user._id}`);
    const data = await response.json();
    console.log(data); 
    console.log(notes); 
    setNotes(data);

  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

  
  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (text) => {
    try {
      // const date = new Date();
      const newNote = {
        userId: user._id,
        title: '', //
        description: text,
        tag: 'General',
        isPinned: false
      };

      const response = await fetch('http://localhost:4000/api/v1/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();
      setNotes([...notes, data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/v1/notes/${id}`, {
        method: 'DELETE',
      });
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      // You can display an error message to the user if needed
    }
  };

  const handlePinned = async (id) => {
    try {
      const updatedNote = notes.find((note) => note._id === id);
      updatedNote.isPinned = !updatedNote.isPinned;
      await fetch(`http://localhost:4000/api/v1/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      // setNotes(updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? { ...note, isPinned: updatedNote.isPinned } : note))
      );
    } catch (error) {
      console.error("Error updating Note:", error);
    }
  };

  const handleEditNote = async (id, newText) => {
    try {
      await fetch(`http://localhost:4000/api/v1/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newText }),
      });
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, description: newText } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error editing note:', error);
      // You can display an error message to the user if needed
    }
  };

  // const toggleDarkMode = () => {
  //   setDarkMode((prevDarkMode) => !prevDarkMode);
  // };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <Search handleSearchNote={setSearchText} />
      <NotesList
        darkMode={darkMode}
        notes={notes.filter(
          (note) =>
            note.description &&
            note.description.toLowerCase().includes(searchText)
        )}
        
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        handleEditNote={handleEditNote}
        handlePinned = {handlePinned}
      />
    </div>
  );
};

export default NotesComponent;
