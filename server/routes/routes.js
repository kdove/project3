const router = require("express").Router();
const finicityController = require("../controllers/finicityController");

//calling our authenticate function to get a new token for the user
router.route("/authenticate").post(finicityController.finicityAuthenticate);
//{
//  token: fsjasksh
//}

//create a new customer when you call this route
//requires a token from the authentication above
//requres paid version
router.route("/createCustomer").post(finicityController.finicityCreateCustomer);
//{
//  n/a
//}

//create a test customer since the normal create customer is not for the free version of the api
//requres a token from authentication
router.route("/createTestCustomer").post(finicityController.finicityCreateTestCustomer);
//{
//    "id": "1005061234",
//    "username": "customerusername1",
//    "createdDate": "1588305190"
//}

//this route call will call the delete function of finicity's api and remove the passed customer
router.route("/removeCustomer/:id").delete(finicityController.finicityDeleteCustomer);
//This method will not return anything from the api
module.exports = router;