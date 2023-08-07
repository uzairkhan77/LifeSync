import Contact from '../models/Contact.js';

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get contacts for a specific user by userID
export const getUserContacts = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the query parameters

  try {
    const userContacts = await Contact.find({ userId });

    if (!userContacts || userContacts.length === 0) {
      return res.status(404).json({ success: false, message: "User contacts not found!" });
    }

    res.status(200).json({ success: true, message: "Successful!", data: userContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { userId, name, email, phone,isFavourite } = req.body;
    const contact = await Contact.create({ userId, name, email, phone, isFavourite });
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Update a contact by ID
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone,isFavourite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone,isFavourite }, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a contact by ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: deletedContact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
