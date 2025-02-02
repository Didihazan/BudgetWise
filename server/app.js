const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', require('./src/routes/transactionRoutes'));
app.use('/api/analytics', require('./src/routes/analyticsRoutes'));
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/financial-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));