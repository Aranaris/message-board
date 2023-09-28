const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_text: {type: String, required: true, maxLength: 100},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    last_updated: {type: Date, default: new Date()},
});

messageSchema.virtual('url').get(function() {
    return `/messages/${this._id}`;
});

module.exports = mongoose.model('Message', messageSchema);
