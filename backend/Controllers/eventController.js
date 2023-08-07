import Event from '../models/Event.js';

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single event by ID
// export const getEventById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await Event.findById(id);
    
//     if (!event) {
//       return res.status(404).json({ success: false, message: 'Event not found' });
//     }

//     res.status(200).json({ success: true, data: event });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// Get a single event by UserID
// export const getUserEvents = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await Event.findById(id);
    
//     if (!event) {
//       return res.status(404).json({ success: false, message: 'Event not found' });
//     }

//     res.status(200).json({ success: true, data: event });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
/// 
export const getUserEvents = async (req, res) => {
  const userId = req.params.id; // Change from req.params.id to req.query.id

  // console.log("User Data:", req.query);
  // console.log("User ID:", req.params.id);

  try {
    const userEvents = await Event.find({ userId });
    console.log("User Events:", userEvents);
  
    if (!userEvents || userEvents.length === 0) {
      return res.status(404).json({ success: false, message: "User Event not found!" });
    }
  
    res.status(200).json({ success: true, message: "Successful!", data: userEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}


// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { userId } = req.body; // Get the user ID from the request body
    const { title, description, startDateTime, endDateTime } = req.body;
    
    // Create the event with the userId
    const event = await Event.create({ userId, title, description, startDateTime, endDateTime });
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Update an event by ID
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDateTime, endDateTime } = req.body;
    const updatedEvent = await Event.findOneAndUpdate({ _id: id }, { title, description, startDateTime, endDateTime }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findOneAndDelete({ _id: id });

    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: deletedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

