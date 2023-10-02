const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_text: {type: String, required: true, maxLength: 100},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    added: {type: Date, default: new Date()},
});

messageSchema.virtual('url').get(function() {
    return `/messageboard/message/${this._id}`;
});

messageSchema.virtual('post_date').get(function() {
    return DateTime.fromJSDate(this.added).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model('Message', messageSchema);
