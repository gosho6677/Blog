const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    iat: { type: Date, required: true },
    unixTime: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = model('Post', schema);