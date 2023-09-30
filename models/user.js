const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, maxLength: 50},
    first_name: {type: String, maxLength: 50},
    last_activity: {type: Date, default: new Date()},
    date_of_birth: {type: Date},
});

userSchema.virtual('name').get(function() {
    let name = "";
    if (this.first_name) {
        name = this.first_name;
    }

    return name;
});

userSchema.virtual('url').get(function() {
    return `/users/profile/${this._id}`;
});

module.exports = mongoose.model('User', userSchema);
