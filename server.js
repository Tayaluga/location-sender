const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// Serve the indexnode.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asadbdhssn@gmail.com',
    pass: 'sagrqftffkomgsbz' // Use the app-specific password here
  }
});

app.post('/send-location', (req, res) => {
  const { latitude, longitude } = req.body;

  const mailOptions = {
    from: 'asadbdhssn@gmail.com',
    to: 'asadbdhssn@gmail.com',
    subject: 'You Recieved the locaion',
    text: `Latitude: ${latitude}, Longitude: ${longitude}`
    
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send('Error sending email: ' + error.message);
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
