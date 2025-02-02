const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();

// CORS הגדרות מורחבות
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// הוספת headers נוספים
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-api-key, Content-Type');
    next();
});

app.get('/api', (req, res) => {
    res.json({ message: 'API is working!' });
});

// בדיקת בריאות השרת
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/transactions', require('./src/routes/transactionRoutes'));
app.use('/api/analytics', require('./src/routes/analyticsRoutes'));

// Middleware לטיפול בשגיאות
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'שגיאה בשרת',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// התחברות למונגו והפעלת השרת
const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 3000;
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
            console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
            console.log('CORS Options:', corsOptions);
        });
    } catch (err) {
        console.error('Server startup failed:', err);
        process.exit(1);
    }
};

startServer();