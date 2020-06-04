import axios from "axios";

export default {
    
    //sends a post request to our authenticate route
    //returns a token to allow us to use the finicity api
    authenticate: function() {
        return axios.post("/authenticate")
            .then(response => {
                return response.data;
            }).catch(error => {
                console.log(error);
            });
    },

    //sends a post request to our createTestCustomer route
    //creates a new customer for testing purposes
    createTestUser: function(userData) {
        return axios({
            method: "post",
            url:"/createTestCustomer",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            return response.data;
        });
    },

    //sends a post request to createConsumer route
    //creates a consumer account for our customer account on finicity
    createConsumer: function(userData) {
        return axios({
            method: "post",
            url: "/createConsumer",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            return response.data;
        });
    },

    //sends a delete request our deleteCustomer route
    //deletes the customer from the finicity database based on which customer id we send
    deleteUser: function(userData) {
        return axios({
            method: "delete",
            url: "/deleteCustomer",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        });
    },

    //sends a get request to our getAccounts route
    //returns the accounts of a given customer in array format
    //uses the customer id#
    getAccounts: function(userData) {
        return axios({
            method: "post",
            url: "/getAccounts",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            return response.data;
        });
    },

    //sends a request to our getStatement route
    //returns a pdf of the statment that matches our search
    //uses token, customerId, and accountId as data parameters
    getStatement: function(userData) {
        console.log(userData);
        return axios({
            method: "post",
            url: "/getStatement",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            return response;
        });
    },

    //sends a get request to our getCustomers route
    //returns an array of customers that meet our parameters
    //uses a token among other parameters
    getCustomers: function(userData) {
        return axios({
            method: "post",
            url: "/getCustomers",
            data: {
                data: userData
            }
        }).catch(error => {
            console.log(error);
        }).then(response => {
            return response.data;
        });
    }
};