const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); 
const User = require('./models/User');
const Part = require('./models/Part');
const Supplier = require('./models/Supplier');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Part.deleteMany();
        await Supplier.deleteMany();

        const createdUser = await User.create({
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL ,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        });

        // Parts seeded manually or via app
        // const parts = [];
        // await Part.insertMany(parts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Part.deleteMany();
        await Supplier.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
