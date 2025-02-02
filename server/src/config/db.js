const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            socketTimeoutMS: 45000,
            family: 4
        });

        mongoose.connection.on('connected', () => {
            console.log(`MongoDB התחבר בהצלחה: ${conn.connection.host}`);
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB שגיאת התחברות:', err);
        });

        return conn;
    } catch (err) {
        console.error('שגיאה בהתחברות למונגו:', err);
        throw err;
    }
};

module.exports = connectDB;