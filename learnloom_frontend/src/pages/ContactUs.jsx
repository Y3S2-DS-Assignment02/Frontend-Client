import React from 'react';

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <h2>Contact Us</h2>
      <p>Have a question or feedback? We'd love to hear from you!</p>
      <p>Reach out to us using the contact information below:</p>
      <ul style={styles.list}>
        <li>Email: contact@learnloom.com</li>
        <li>Phone: 123-456-7890</li>
        <li>Address: 123 Learnloom Street, City, Country</li>
      </ul>
      <p>Alternatively, you can fill out the form below to send us a message:</p>
      {/* Add a contact form component here */}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
};

export default ContactUs;
