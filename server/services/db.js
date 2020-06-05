const mongoose = require("mongoose");

let db;

mongoose.Promise = global.Promise;

module.exports.init = async function() {
    if (db) {
        return db;
    } else {
        return mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test", { useNewUrlParser: true, useUnifiedTopology: true })
            .then(instance => db = instance)
    }
}