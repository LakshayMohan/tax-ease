const express = require('express');
const router = express.Router();
const Tax = require('../models/Tax');

// Save tax calculation
router.post('/save', async (req, res) => {
    try {
        console.log('Saving tax calculation:', req.body);
        
        // Verify user exists
        if (!req.body.userId) {
            return res.status(400).json({ 
                message: 'User ID is required' 
            });
        }

        const taxCalculation = await Tax.create(req.body);
        
        // Populate user details
        await taxCalculation.populate('userId', 'username email');
        
        res.status(201).json(taxCalculation);
    } catch (error) {
        console.error('Error saving tax calculation:', error);
        res.status(500).json({ 
            message: 'Error saving tax calculation',
            error: error.message 
        });
    }
});

// Get user's tax calculations
router.get('/user/:userId', async (req, res) => {
    try {
        const taxCalculations = await Tax.find({ userId: req.params.userId })
            .sort({ createdAt: -1 })
            .populate('userId', 'username email');
            
        res.json(taxCalculations);
    } catch (error) {
        console.error('Error fetching tax calculations:', error);
        res.status(500).json({ 
            message: 'Error fetching tax calculations',
            error: error.message 
        });
    }
});

// Get single tax calculation
router.get('/:id', async (req, res) => {
    try {
        const calculation = await Tax.findById(req.params.id)
            .populate('userId', 'username email');
            
        if (!calculation) {
            return res.status(404).json({ 
                message: 'Tax calculation not found' 
            });
        }
        
        res.json(calculation);
    } catch (error) {
        console.error('Error fetching tax calculation:', error);
        res.status(500).json({ 
            message: 'Error fetching tax calculation',
            error: error.message 
        });
    }
});

module.exports = router; 