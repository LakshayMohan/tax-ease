const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
router.post('/register', async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: 'Please provide all required fields' 
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (userExists) {
            return res.status(400).json({ 
                message: 'User already exists with this email or username' 
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password
        });

        if (user) {
            console.log('User created successfully:', user._id);
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Error creating user',
            error: error.message 
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        const { identifier, password } = req.body;

        // Validate input
        if (!identifier || !password) {
            return res.status(400).json({ 
                message: 'Please provide both identifier and password' 
            });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (user && (await user.matchPassword(password))) {
            console.log('User logged in successfully:', user._id);
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email
            });
        } else {
            res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Error during login',
            error: error.message 
        });
    }
});

module.exports = router; 