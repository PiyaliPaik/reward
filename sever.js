const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/log', (req, res) => {
  const { lat, lng } = req.body;
  const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
  console.log(mapsLink)

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any SMTP
    auth: {
       user: 'piyalipaik07@gmail.com',
      pass: 'trtnuuzimlhtwrwf'  // Consider using environment variables or app password
    }
  });

  const mailOptions = {
    from: 'piyalipaik07@gmail.com',
    to: 'piyalipaik07@gmail.com',
    subject: 'New Location Captured',
    text: `User location: ${mapsLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email send error:', error);
      return res.status(500).send('Email failed');
    } else {
      console.log('Email sent: ' + info.response);
      return res.sendStatus(200);
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
