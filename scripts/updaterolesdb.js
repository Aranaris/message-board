console.log('update roles collection in MongoDB');

const Role = require('../models/role');

const roleList = ['new', 'admin', 'member'];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const mongoDB = process.env.mongodb_connection;

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    for (const role of roleList) {
        await roleUpdate(role);
    }
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
};

async function roleUpdate(role) {
    
    const newRole = new Role({ role_name: role });
    await newRole.save();
    console.log(`added role: ${role}`);
}
