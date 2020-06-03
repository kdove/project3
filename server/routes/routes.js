const router = require("express").Router();
const finicityController = require("../controllers/finicityController");

//calling our authenticate function to get a new token for the user
router.route("/authenticate").post(finicityController.finicityAuthenticate);
/*
{
  token: fsjasksh
}
*/

//create a new customer when you call this route
//requires a token from the authentication above
//requres paid version
router.route("/createCustomer").post(finicityController.finicityCreateCustomer);
/*
{
  n/a
}
*/

//create a test customer since the normal create customer is not for the free version of the api
//requres a token from authentication
router.route("/createTestCustomer").post(finicityController.finicityCreateTestCustomer);
/*
{
    "id": "1005061234",
    "username": "customerusername1",
    "createdDate": "1588305190"
}
*/

//this route call will call the delete function of finicity's api and remove the passed customer
router.route("/deleteCustomer").delete(finicityController.finicityDeleteCustomer);
//This method will not return anything from the api

//this route will return a customer's account list in an array
//requires a token from authentication route
router.route("getAccounts").get(finicityController.finicityGetCustomerAccounts);
/*
{
     "accounts": []
}
*/

//this route will return a pdf of an account statment for a given account to a given customer
//requires authentication token
router.route("/getStatement").post(finicityController.finicityGetAccountStatement);
/*
returns a pdf, no json syntex
*/
module.exports = router;