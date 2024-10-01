const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Route for sending email
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body); // Check the incoming data

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable
            pass: process.env.EMAIL_PASS  // Use environment variable
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Use environment variable
        subject: `Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.json({ message: 'Message sent successfully!' }); // Respond with success
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
