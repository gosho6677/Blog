const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = model('User', schema);