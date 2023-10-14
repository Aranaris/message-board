const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role_name: { type: String, enum: [ 'new', 'admin', 'member' ], required: true, unique: true, dropDups: true, maxLength: 50 },
    role_description: { type: String, maxLength: 100 }
});

module.exports = mongoose.model('Role', roleSchema);
