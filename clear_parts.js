const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Part = require('./models/Part');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const clearParts = async () => {
    try {
        await Part.deleteMany();
        console.log('Parts successfully cleared from database.');
        process.exit();
    } catch (error) {
        console.error('Error clearing parts:', error);
        process.exit(1);
    }
};

clearParts();
