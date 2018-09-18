const mongoose = require('mongoose')

var GroupSchema = new mongoose.Schema({
    name: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    privacy: String,
    createdBy: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
