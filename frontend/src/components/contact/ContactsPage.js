import React, { useState, useEffect,useContext } from "react";
import { ContactForm } from "./ContactForm";
import ContactItem from "./ContactItem";
import './contact.css';
import {AuthContext} from "../../context/AuthContext"
import CustomizedSnackbars from "../CustomizedSnackbars";

export const ContactsPage = () => {
  // Define state variables for contact info and duplicate check
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [contacts, setContacts] = useState([]);
  const {user} = useContext(AuthContext)
  // Function to get favorite contacts from the contacts array
  const getFavoriteContacts = () => contacts.filter((contact) => contact.isFavourite);
  // Function to get non-favorite contacts from the contacts array
  const getNonFavoriteContacts = () => contacts.filter((contact) => !contact.isFavourite);
  // Check if it has favorite contacts
  const hasFavoriteContacts = getFavoriteContacts().length > 0;
  const hasNonFavoriteContacts = getNonFavoriteContacts().length > 0;

  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginAlertSeverity, setLoginAlertSeverity] = useState('error');
  const [loginAlertMessage, setLoginAlertMessage] = useState('');

  // Fetch contacts from the backend API
  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to fetch contacts from the backend API
  const fetchContacts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/contacts/user/${user._id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContacts(data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the contact name already exists
    if (contacts.find((contact) => contact.name === name)) {
      setIsDuplicate(true);
      return;
    }

    // Create a new contact object with the form data
    const newContact = {
      userId: user._id,
      name: name,
      phone: phone,
      email: email,
    };

    // Make a POST request to add the new contact
    fetch('http://localhost:4000/api/v1/contacts/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
    
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // If the request is successful, fetch the updated contacts and reset the form data
        fetchContacts();
        setName("");
        setPhone("");
        setEmail("");
        // Show the success message using an alert
        // alert("Contact added successfully!");
        setLoginAlertOpen(true);

      })
      .catch((error) => {
        // Handle errors here, like showing an error message to the user.
        console.error("Error adding contact:", error);
      });
  };

    // Function to handle contact deletion
  const handleContactDelete = async () => {
    // After a successful delete, fetch the updated contacts
    await fetchContacts();
  };
  const handleContactUpdate = async () => {
    // After a successful update, fetch the updated contacts
    await fetchContacts();
  };

  // useEffect(() => {
  //   // Fetch contacts when the component mounts
  //   fetchContacts();
  // }, []);

  return (
    <div>
      <div className="container">
        <h1 className="my-4">Add Contact</h1>
        <ContactForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
        
        
        <div className="row mt-5">
        {hasFavoriteContacts && (
          <>
            <h1 style={{ textAlign: 'left', fontSize: '15px', marginLeft: '10px' }}>Favorite Contacts</h1>
            {getFavoriteContacts().map((contact) => (
              <div className="col-md-4 my-2" key={contact._id}>
                <ContactItem
                  id={contact._id}
                  title={contact.name}
                  email={contact.email}
                  number={contact.phone}
                  isFavorite={contact.isFavourite}
                  onContactDelete={handleContactDelete}
                  onContactUpdate={handleContactUpdate}
                />
              </div>
            ))}
            {hasFavoriteContacts && hasNonFavoriteContacts && <hr style={{ color: '#000000', backgroundColor: '#000000', height: 1, borderColor: '#000000', marginTop: '25px', marginBottom: '25px' }} />}
          </>
        )}
        {hasNonFavoriteContacts && (
          <>
            {hasNonFavoriteContacts && hasFavoriteContacts && <h1 style={{ textAlign: 'left', fontSize: '15px', marginLeft: '10px' }}>Other Contacts</h1>}
            {getNonFavoriteContacts().map((contact) => (
              <div className="col-md-4 my-2" key={contact._id}>
                <ContactItem
                  id={contact._id}
                  title={contact.name}
                  email={contact.email}
                  number={contact.phone}
                  isFavorite={contact.isFavourite}
                  onContactDelete={handleContactDelete}
                  onContactUpdate={handleContactUpdate}
                />
              </div>
            ))}
          </>
        )}{contacts.length === 0 && <h1 style={{ textAlign: 'center', fontSize: '15px' }}>Add Contacts to Preview</h1>}
        </div>
      </div>
      <CustomizedSnackbars
        severity={loginAlertSeverity}
        message={"Contact added successfully"}
        children={loginAlertMessage}
        open={loginAlertOpen}
        onClose={() => setLoginAlertOpen(false)}
      />
    </div>
  );
};
