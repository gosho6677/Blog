const { Schema, model } = require('mongoose');

const schema = new Schema({
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Comment', schema);