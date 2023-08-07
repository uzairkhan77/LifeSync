import React,{useState} from 'react'
import { ContactsPage } from './contact/ContactsPage';

const ContactComponent = () => {

    const [contacts, setContacts] = useState([]);
    const addContact = (name, phone, email) => {
      const contact = { name, phone, email };
      setContacts((prev) => [...prev, contact]);
    };
  
  
    return (
      <>
        <ContactsPage contacts={contacts} addContact={addContact} />
      </>
    );
  }

export default ContactComponent
