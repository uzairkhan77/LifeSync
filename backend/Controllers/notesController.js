import Note from '../models/Note.js';

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { userId ,title, description, tag, isPinned } = req.body;

  try {
    const newNote = await Note.create({
      userId,
      title,
      description,
      tag,
      isPinned
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

//get user notes
export const getUserNotes = async (req, res) => {
  const userId = req.params.id; // Change from req.params.id to req.query.id

  // console.log("User ID:", userId);

  try {
    const userNotes = await Note.find({ userId });
    // console.log("User Notes:", userNotes);

    if (!userNotes || userNotes.length === 0) {
      return res.status(404).json([]);
    }

    res.status(200).json( userNotes );
  } catch (error) {
    console.log(error);
    res.status(500).json([]);
  }
};

///export const getNotes = async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.json(notes);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };



export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tag, isPinned } = req.body;
    
    // Find the note by ID and update its properties
    const updatedNote = await Note.findByIdAndUpdate(id, { title, description, tag,isPinned }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

