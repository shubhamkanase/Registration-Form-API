    // routes/user.js

const express = require('express');
const multer = require('multer');
const User = require('../model/User');
const router = express.Router();

// Setup multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// POST route to handle form submission
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const { name, email, password, phone, description, termsAccepted } = req.body;
        const image = req.file ? req.file.path : '';

        const newUser = new User({
            name,
            email,
            password,
            phone,
            description,
            image,
            termsAccepted
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
