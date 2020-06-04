const router = require("express").Router();
const finicityController = require("../controllers/finicityController");

/*
Even though it may not be best practice, the finicity api often requires a body to be sent out on get requests, and axios does not
support it, so almost all of these will be set as post requests, the finicity controller uses proper get and post commands to server though
through the use of request and axios working together
*/

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

//create consumer for a given customer
//requires a customerId, firstName, lastName, address, state, zip, phone, ssn, birthday, and email
//requires a token from authentication
router.route("/createConsumer").post(finicityController.finicityCreateConsumer);
/*
{
  "id": *consumerId*,
  "createdDate": "created date number",
  "customerId": "consumer's customer ID"
}
*/

//this route call will call the delete function of finicity's api and remove the passed customer
router.route("/deleteCustomer").delete(finicityController.finicityDeleteCustomer);
//This method will not return anything from the api

//this route will return a customer's account list in an array
//requires a token from authentication route
router.route("/getAccounts").post(finicityController.finicityGetCustomerAccounts);
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