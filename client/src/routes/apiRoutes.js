import axios from "axios";

//export all these api call functions
export default {

    //this first method will authenticate our connection to finicity and return a token we can use to make actual calls
    finicityAuthenticate: function() {
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
        });
        //should return a customer object
    },

    //finicity create test consumer is free however, and can only register accounts with FinBank institutions
    //does require authentication
    finicityCreateTestCustomer: function(token, username) {
        return axios({
            method: "post",
            url: "https://api.finicity.com/aggregation/v1/customers/testing",
            //data into finicity servers
            //just a username this time
            data: {
                "username": username
            },
            //our headers
            //Accept, Content-type, app-key, token, etc.
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Finicity-App-Key": process.env.FINICITY_APP_KEY,
                "Finicity-App-Token": token
            }
        }).catch(error => {
            console.log(error);
        });
        //should return a test customer object
        //{
            //"id": a number
            //"username": "the entered username"
            //"createdDate": "The date the test user was created"
        //}
    }
};