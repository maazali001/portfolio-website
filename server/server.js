const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors'); // Import the CORS package

const app = express();
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000

// Use CORS middleware and allow only your frontend
app.use(cors({
    origin: [
        'https://portfolio-website-8qrems2hq-mazz-alis-projects.vercel.app', // Aapka frontend URL
        'https://portfolio-website-m73aidrm8-mazz-alis-projects.vercel.app' // Dusra frontend URL agar hai
    ],
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Agar aapko cookies ya credentials ki zarurat hai to
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
        to: 'alimazz272@gmail.com', // Replace with the receiver's email
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
