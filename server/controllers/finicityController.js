//for our post requests, since axios is easy
const axios = require("axios");
//for our get requests, since axios does not support sending objects on a get request
//though some testing in finicity's api via postman has reveiled that sending a post request instead might still work
//I am at an impasse as to what best practice is to be used here, on one hand I am loading in an entire new library package
//to do simple get requests, on the other hand, get requests through post requests are bad practice apparently.
const request = require("request");
console.log(process.env.FINICITY_APP_KEY);


//export all these api call functions
module.exports = {

    //this first method will authenticate our connection to finicity and return a token we can use to make actual calls
    finicityAuthenticate: function(req, res) {
        return axios({
            method: "post", 
            url: "https://api.finicity.com/aggregation/v2/partners/authentication",
            //the api requests that we send the partnerID and secret in the data
            data: {
                partnerId: process.env.PARTNER_ID,
                partnerSecret: process.env.PARTNER_SECRET
            },
            //our api key is needed in the header
            headers: {
              "Finicity-App-Key": process.env.FINICITY_APP_KEY,
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }).catch(error => {
              console.log(error);
          }).then(response => {
            res.json(response.data);
          })
          //Should return a token:
          //{
                //token
          //}
    },

    //create customer will use the create customer api route
    finicityCreateCustomer: function(req, res) {
        return axios({
            method: "post",
            url: "https://api.finicity.com/aggregation/v1/customers/active",
            //data of customer passed through parameters
            data: {
                "username": req.body.data.username,
                "firstName": req.body.data.firstName,
                "lastName": req.body.data.lastName
            },
            //headers will contain our app token passed in, and the app key we already know
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Finicity-App-Token": req.body.data.token
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            res.json(response.data);
        });
        //should return a customer object
    },

    //finicity create test consumer is free however, and can only register accounts with FinBank institutions
    //does require authentication
    finicityCreateTestCustomer: function(req, res) {
        return axios({
            method: "post",
            url: "https://api.finicity.com/aggregation/v1/customers/testing",
            //data into finicity servers
            //just a username this time
            data: {
                "username": req.body.data.username
            },
            //our headers
            //Accept, Content-type, app-key, token, etc.
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Finicity-App-Token": req.body.data.token
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            res.json(response.data);
        });
        //should return a test customer object
        //{
            //"id": a number
            //"username": "the entered username"
            //"createdDate": "The date the test user was created"
        //}
    },

    //this method will create a consumer for a given customer
    //consumers are more personal information about a given customer and are required to connect accounts
    //each customer can have one consumer
    //they are so if the customer deletes or deactivates their account, they can link the same information to a new account
    //requires a token authentication
    finicityCreateConsumer: function(req, res) {
        console.log(req.body.data);
        return axios({
            method: "post",
            url: `https://api.finicity.com/decisioning/v1/customers/${req.body.data.customerId}/consumer`,
            data: {
                //data required is:
                //firstName
                "firstName": req.body.data.firstName,
                //lastName
                "lastName": req.body.data.lastName,
                //address
                "address": req.body.data.address,
                //city
                "city": req.body.data.city,
                //state
                "state": req.body.data.state,
                //zip(5 numbers)
                "zip": req.body.data.zip,
                //phone(10 numbers)
                "phone": req.body.data.phone,
                //ssn(9 numbers)
                "ssn": req.body.data.ssn,
                //birthday as an object (year, month, day) in numbers
                "birthday": req.body.data.birthday,
                //email
                "email": req.body.data.email
            },
            //headers are:
            //the token,
            //the app key,
            //accept and content-type
            headers: {
                "Finicity-App-Token": req.body.data.token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            res.json(response.data);
        })
    },

    //completely removes a customer from finicity's system, will remove the customer's accounts and transactions
    //use with great caution.
    //does require an authentication token
    finicityDeleteCustomer: function(req, res) {
        return axios({
            method: "delete",
            url: `https://api.finicity.com/aggregation/v1/customers/${req.body.data.customerId}`,
            //does not require a data parameter
            data: null,
            //our headers are the finicity app key and the finicity app token
            headers: {
                "Finicity-App-Token": req.body.data.token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY
            }
        }).catch(error => {
            console.log(error);
        });
        //this method will not actually return anything if it works
    },

    //this will return a full array of the given user's accounts
    //requires a token authentication
    //requires the user's id#
    //using the request library instead of the axios library since it will support sending a body and headers like what the finicity api wants
    finicityGetCustomerAccounts: function(req, res) {
        console.log(req.body);
        //we'll load in our options here, this will allow us to pass it in as one parameter to the call
        const options = {
            "method": "GET",
            "url": `https://api.finicity.com/aggregation/v1/customers/${req.body.data.customerId}/accounts`,
            "headers": {
                "Finicity-App-Token": req.body.data.token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"status": "pending"})
        };

        //our call request
        request(options, function(error, response) {
            if(error) console.log(error);
            res.json(response.body);
        });
    },
    
    //this function will return a pdf of the account statement for the customer and account given
    //requires a customer, and an account
    //requires authentication
    finicityGetAccountStatement: function(req, res) {
        console.log(req.body);
        return axios({
            method: "get",
            url: `https://api.finicity.com/aggregation/v1/customers/${req.body.data.customerId}/accounts/${req.body.data.accountId}/statement`,
            params: {
                "index": 1
            },
            //headers are:
            //the finicity app token
            //finicity app key
            //accept
            headers: {
                "Finicity-App-Token": req.body.data.token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Accept": "application/pdf, application/json"
            },
        }).catch(error => {
            console.log(error);
        }).then(response => {
            res.json(response.data);
        });
    },

    //this function will return an array with all active customers on finicity's database
    //requires a token authentication
    //returns an object containing an array "customers" with customer objects in it
    finicityGetCustomers: function(req, res) {
        //options to pass into our call
        const options = {
            "method": "GET",
            "url": "https://api.finicity.com/aggregation/v1/customers",
            headers: {
                "Finicity-App-Token": req.body.data.token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Accept": "application/json"
            },
            body: JSON.stringify({
                //"search": "searchvalue"
                //"username": "customerusername"
                "start": 1,
                "limit": 25,
                "type": "testing"
                //"type:" "active"
            })
        }
        //our request
        request(options, function(error, response) {
            if(error) console.log(error);
            res.json(response.body);
        });
        /*
        return axios({
            method: "get",
            url: "https://api.finicity.com/aggregation/v1/customers",
            //data will be the parameters of the seach
            //we'll hard code this to return all for now, but in the future
            //we could pass in some searching parameters to find specific customers
            //enrolled by us
            params: ,
            //headers are our standard finicity app key and tokens
            headers: {
                "Finicity-App-Token": req.body.data.token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Accept": "application/json"
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            res.json(response.data);
        })
        */
    }
};