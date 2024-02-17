// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'kevorklepedjian1@gmail.com',
    pass: 'vcxprrwrhudcqcga', // Replace 'your-password' with the application-specific password
  },
});

// Predefined email address to receive form submissions
const recipientEmail = 'kevorklepedjia1@gmail.com';

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  
  // Create email message
  const mailOptions = {
    from: 'kevorklepedjian1@gmail.com', // Use your own email here
    to: recipientEmail,
    subject: 'New Form Submission',
    text: `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nAddress: ${formData.address}\nPhone Number: ${formData.phoneNumber}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Form submitted successfully' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
