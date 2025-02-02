const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db'); // או הנתיב המדויק לקובץ
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', require('./src/routes/transactionRoutes'));
app.use('/api/analytics', require('./src/routes/analyticsRoutes'));

// התחברות למונגו והפעלת השרת
const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (err) {
        console.error('Server startup failed:', err);
        process.exit(1);
    }
};

startServer();