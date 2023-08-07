import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getUserContacts
} from '../Controllers/contactController.js';




const router = express.Router();

router.post("/api/v1/contacts", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // Create a new Contact instance using the Contact model
    const newContact = new Contact({
      name: name,
      email: email,
      phone: phone,
      isFavourite: false
    });

    // Save the new contact to the database
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to add the contact to the database" });
  }
});

// Get all contacts
router.get('/', getContacts);

// Get a single contact by ID
router.get('/:id', getContactById);

// Get a contacts by userID
router.get('/user/:id', getUserContacts);

// Create a new contact
/**
* @swagger
 * /api/v1/contacts/: 
 *  post:
 *    tags:
 *      - Contact Route 
 *    summary: Create a Contact
 *    description: Use to Create a Contact
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Contact'
      
 *    responses:
 *      '201':
 *        description: Contact Created Successfully
 *      '500':
 *        description: Failed to create a Contact

 * 
 */

router.post('/', createContact);

// Update a contact by ID
router.put('/:id', updateContact);

// Delete a contact by ID
router.delete('/:id', deleteContact);

export default router;
