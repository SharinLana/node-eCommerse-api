const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "User must have a password"],
        minLength: [6, "Password cannot be shorter that 6 characters!"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
