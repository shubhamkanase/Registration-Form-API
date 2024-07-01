
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    termsAccepted: { type: Boolean, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
