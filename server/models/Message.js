const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//messages are what the book keepers and the users will use to keep in touch with each other
const MessageSchema = new Schema({
    //they require a subject to fill the subject line
    subject: {
        type: String,
        required: true
    },
    //the content will be the message itself
    content: {
        type: String,
        required: true
    },
    //receiver is the person the message will be meant for
    receiver: {
        type: String,
        required: true
    },
    // refers to the user who created the message. refers to "User" model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

//finalize our message model
const Message = mongoose.model("Message", MessageSchema);

//export it
module.exports = Message;