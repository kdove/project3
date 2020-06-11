const db = require("../models/Message");

//export the routes
module.exports = {
    create: function(req, res) {
        db.Message
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(error => res.status(422).json(error));
    }
}