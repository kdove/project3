const db = require("../models/Message");

module.export = {
    create: function(res, req) {
        db.Message
            .create(req.body)
            .then(dbModle => res.json(dbModle))
            .catch(err => res.status(422).json(err));
    },
    findAll: function(req, res) {
        db.Message
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Message
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};