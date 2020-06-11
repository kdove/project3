const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//users will need to be authenticated in the database
const userSchema = new mongoose.Schema({
    //email will also serve as the user's username
    email: {
        type: String,
        trim: true,
        required: "Users must have an email address"

    },
    //client's full name
    name: {
        type: String,
        trim: true,
        required: true
    },
    //password should be hashed
    password: {
        type: String,
        trim: false,
        required: "Enter a valid password",
    },
    //name of company
    //not required if app is meant for personal use
    company: {
        type: String,
        trim: true,
        required: false
    },
    //shipping address
    //required for now
    address: {
        type: String,
        trim: true,
        required: true
    },
    //city location
    //required for now
    city: {
        type: String,
        trim: true,
        required: true
    },
    //zip code
    //required for now
    zip: {
        type: Number,
        trim: true,
        required: true
    },
    //database info, in case you want to know how old this profile is, use if you want.
    created: {
        type: Date,
        default: Date.now
    },

});

//finalize our model schema
const User = mongoose.model("User", userSchema);

//export our user model
module.exports = User;