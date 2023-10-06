const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const opts = { toJSON: {virtuals: true }};
const userSchema = new Schema({
    username: {type: String, required: true, maxLength: 50},
    first_name: {type: String, maxLength: 50},
    last_activity: {type: Date, default: new Date()},
    date_of_birth: {type: Date},
}, opts);

userSchema.virtual('name').get(function() {
    let name = "";
    if (this.first_name) {
        name = this.first_name;
    }

    return name;
});

userSchema.virtual('url').get(function() {
    return `/messageboard/user/${this._id}`;
});

userSchema.virtual('dob_formatted').get(function() {
    if (this.date_of_birth) {
        return DateTime.fromJSDate(this.date_of_birth).toISODate();
    } else {
        return 'N/A';
    }
}).set(function(v) {
    this.set({ date_of_birth: DateTime.fromISO(v).toJSDate() });
});

userSchema.virtual('last_activity_formatted').get(function() {
    return DateTime.fromJSDate(this.last_activity).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('User', userSchema);
