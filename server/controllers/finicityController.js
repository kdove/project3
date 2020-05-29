const axios = require("axios");
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
    finicityCreateCustomer: function(token, username, firstName, lastName) {
        return axios({
            method: "post",
            url: "https://api.finicity.com/aggregation/v1/customers/active",
            //data of customer passed through parameters
            data: {
                "username": username,
                "firstName": firstName,
                "lastName": lastName
            },
            //headers will contain our app token passed in, and the app key we already know
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Finicity-App-Token": token
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
    //completely removes a customer from finicity's system, will remove the customer's accounts and transactions
    //use with great caution.
    //does require an authentication token
    finicityDeleteCustomer: function(token, customerId) {
        return axios({
            method: "delete",
            url: "https://api.finicity.com/aggregation/v1/customers/testing",
            //does not require a data parameter
            data: null,
            //our headers are the finicity app key and the finicity app token
            headers: {
                "Finicity-App-Token": token,
                "Finicity-App-Key": process.env.FINICITY_APP_KEY
            }
        }).catch(error => {
            console.log(error);
        });
        //this method will not actually return anything if it works
    }
};