const router = require("express").Router();
const imageController = require("../controllers/imageController");

// Matches with "/api/books"
router.route("/statement")
    .post(imageController.create)
    .get(imageController.findAll);

// Matches with "/api/books/:id"
router
    .route("/statement :id")
    .get(imageController.findById)
    .delete(imageController.remove);

module.exports = router;