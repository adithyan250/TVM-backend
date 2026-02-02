const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Part = require('./models/Part');
const connectDB = require('./config/db');

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();
        const count = await Part.countDocuments();
        console.log(`Current Parts Count: ${count}`);
        
        if (count > 0) {
            const parts = await Part.find({}).limit(3);
            console.log('Sample Parts:', parts.map(p => p.name));
        }

        process.exit();
    } catch (error) {
        console.error('Error checking data:', error);
        process.exit(1);
    }
};

checkData();
