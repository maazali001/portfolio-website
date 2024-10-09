const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from your frontend domain
app.use(cors({
    origin: 'https://portfolio-website-fwbbznn6t-mazz-alis-projects.vercel.app', // Update with your frontend URL
    methods: ['GET', 'POST'], // Allowed HTTP methods
}));

// Middleware to parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for sending email
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alimazz272@gmail.com', // Replace with your email
            pass: 'hlqr whwk qmgo mwhw' // Replace with your email password or app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'alimazz272@gmail.com', // Replace with your email
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
