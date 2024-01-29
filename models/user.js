const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true, unique: true},
    user_password: { type: String, required: true },
});

const user_module = mongoose.model('user', userSchema);
module.exports = user_module;
