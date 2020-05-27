const router = require("express").Router();
const finicityController = require("../controllers/finicityController");

router.route("/authenticate").post(finicityController.finicityAuthenticate);

module.exports = router;