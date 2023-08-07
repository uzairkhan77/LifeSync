import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./events.css";
import EventCard from "./EventCard";
import {AuthContext} from "../../context/AuthContext"

// card
import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

function Events() {
  // Localizer for date-fns library
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext)
  // const userEvents = eventData.filter((event) => event.userId === user._id);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/events/${user._id}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        // Convert date strings to Date objects for startDateTime and endDateTime properties
        const eventsWithDateObjects = data.data.map((event) => ({
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }));

        setEventData(eventsWithDateObjects);
      } else {
        console.error(
          "Invalid data format: expected an object with 'data' property containing an array of events"
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  
  const [newEvent, setNewEvent] = useState({
    userId: user._id,
    title: "",
    startDateTime: null,
    endDateTime: null,
    description: "",
  });
  const [allEvents, setAllEvents] = useState([]);

  async function handleAddEvent() {
    try {
      const response = await fetch("http://localhost:4000/api/v1/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add event to the database");
      }
  
      console.log("Event added successfully:", newEvent);
  
      // Update the state and reset the newEvent state to its initial values
      setAllEvents([...allEvents, newEvent]);
      setNewEvent({
        userId: user && user._id,
        title: "",
        startDateTime: null,
        endDateTime: null,
        description: "",
        
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  }
  
  const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return str; // Return the original input if it's not a non-empty string
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const dateObj = new Date(dateString);
    return dateObj.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchEvents();
  }, [newEvent]);

  const handleEventUpdate=()=>{
    fetchEvents();
  }

  return (
    <div className="App" style={{ backgroundColor: "white", color: "white" }}>
      <h2 style={{ color: "#6f42c1" }}>Add New Event</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "17.5%" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Event Description"
          style={{ width: "17.5%" }}
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />

        <div style={{ position: "relative", zIndex: 9999 }}>
          <DatePicker
            placeholderText="Start Date"
            style={{ width: "20%" }}
            selected={newEvent.startDateTime}
            onChange={(startDateTime) =>
              setNewEvent({ ...newEvent, startDateTime })
            }
          />
        </div>
        <div style={{ position: "relative", zIndex: 9998 }}>
          <DatePicker
            placeholderText="End Date"
            style={{ width: "40%" }}
            selected={newEvent.endDateTime}
            onChange={(endDateTime) =>
              setNewEvent({ ...newEvent, endDateTime })
            }
          />
        </div>
        <button
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
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={eventData}
        startAccessor="startDateTime"
        endAccessor="endDateTime"
        style={{ height: 500, margin: "50px" }}
      />
      {/* Card to display fetched events */}
      <h1 style={{fontSize:"80px", marginBottom:'27px'}}> Events</h1>
      {eventData.length === 0 ? (
  <p style={{color:"Black"}}>Add Events to Preview...</p>
) : (
  <div className="row">
    {user &&
      eventData.map((event) => (
        <div className="col-md-4" key={event._id}>
          <EventCard
            id={event._id}
            title={capitalizeFirstLetter(event.title)}
            startDateTime={formatDate(event.startDateTime)}
            endDateTime={formatDate(event.endDateTime)}
            description={capitalizeFirstLetter(event.description)}
            onEventUpdate={handleEventUpdate}
            setEventData={setEventData} // Pass the setEventData function as a prop

          />
        </div>
      ))}
  </div>
)}

    </div>
  );
}

export default Events;
