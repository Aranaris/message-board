console.log('populate mongodb with some test data');

const Message = require('../models/message');
const User = require('../models/user');

const messages = [];
const users = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dotenv = require('dotenv');
dotenv.config({path : './.env'});
const mongoDB = process.env.mongodb_connection;

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
};

async function userCreate(index, username, first_name, last_activity, date_of_birth) {
    const userdetail = {
        username: username,
        first_name: first_name,
    }

    if (last_activity != false) {
        userdetail.last_activity = last_activity;
    }

    if (date_of_birth != false) {
        userdetail.date_of_birth = date_of_birth;
    }

    const user = new User(userdetail);
    await user.save();
    users[index] = user;

    console.log(`Added user ${username}`);
};

async function createUsers() {
    console.log('adding users');
    await Promise.all([
        userCreate(0, 'user1', 'testname', '2015-01-01', '1995-12-03'),
        userCreate(1, 'user2', 'testname2'),
    ]);
};

async function messageCreate(index, message_text, user, added) {
    const messagedetail = {
        message_text: message_text,
        user: user,
    };

    if (added != false) {
        messagedetail.added = added;
    }

    const message = new Message(messagedetail);
    await message.save();
    messages[index] = message;

    console.log(`Added message ${message_text}`);
};

async function createMessages() {
    console.log('adding messages');
    await Promise.all([
        messageCreate(0, 'first!', users[0], '2016-01-23'),
        messageCreate(1, 'test message', users[1]),
    ]);
};
