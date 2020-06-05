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
    //password should be hashed
    password: {
        type: String,
        trim: false,
        required: "Enter a valid password",
    },
    //database info, in case you want to know how old this profile is, use if you want.
    created: {
        type: Date,
        default: Date.now
    },
    // refrencing the id of the message not the actual message. refers to the "Message" model
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    // refrencing the id of the PDF file not the actual PDF file. refers to the "Statment" model
    statement: [{
        type: Schema.Types.ObjectId,
        ref: 'Statement'
    }]
});

//finalize our model schema
const User = mongoose.model("User", userSchema);

//export our user model
module.exports = User;