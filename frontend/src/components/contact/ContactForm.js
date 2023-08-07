import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div class="my-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contact name"
        required/>
        </div>
        <div class="my-2">
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Contact phone"
        pattern="[0-9]{8,15}"
        required
        />
        </div>
        <div class="my-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Contact email"
        required
      />
    </div>
      <input type="submit" value="Add contact" />
    </form>
  );
};
