import React, { Component } from "react";
import "./App.css";
import api from "./api";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p className="App-intro">
          This is a list of test functions to make sure the back end of the application is working
        </p>
      </div>
      <br />
      <button onClick={createToken}>Create new Token</button>
      <br />
      <br />
      <input type="text" id="username" /> <button onClick={createTestUser}>Create Test User</button>
      <br />
      <br />
      <button onClick={getStatment}>The get statment button, press only after hitting authenticate</button>
      <br />
      <br />
      <button onClick={getAccounts}>console log accounts, hit after authenticate</button>
      <br />
      <br />
      <input type="text" name="firstName" id="firstName" /> <label htmlFor="firstName">First Name</label>
      <br />
      <input type="text" name="lastName" id="lastName" /> <label htmlFor="lastName">Last Name</label>
      <br />
      <input type="text" name="address" id="address" /> <label htmlFor="address">Street Address</label>
      <br />
      <input type="text" name="city" id="city" /> <label htmlFor="city">City</label>
      <br />
      <input type="text" name="state" id="state" /> <label htmlFor="state">State (two letters)</label>
      <br />
      <input type="text" name="zip" id="zip" /> <label htmlFor="zip">Zip Code (5 numbers)</label>
      <br />
      <input type="text" name="phone" id="phone" /> <label htmlFor="phone">Phone Number (10 numbers)</label>
      <br />
      <input type="text" name="ssn" id="ssn" /> <label htmlFor="ssn">SSN (9 numbers)</label>
      <br />
      <input type="text" name="birthdayYear" id="birthdayYear" /> <label htmlFor="birthdayYear">Year of Birth (4 numbers)</label>
      <br />
      <input type="text" name="birthdayMonth" id="birthdayMonth" /> <label htmlFor="birthdayMonth">Month of Birth (2 numbers)</label>
      <br />
      <input type="text" name="birthdayDay" id="birthdayDay" /> <label htmlFor="birthdayDay">Day of Birth (2 numbers)</label>
      <br />
      <input type="text" name="email" id="email" /> <label htmlFor="email">Email address</label>
      <br />
      <input type="text" name="customerId" id="customerId" /> <label htmlFor="customerId">Customer ID number</label>
      <button onClick={createConsumer}>Create Consumer button</button>
      <br />
      <br />
      <input type="text" name="deleteCustomerId" id="deleteCustomerId" /> <label htmlFor="deleteCustomerId">Customer ID to delete</label>
      <button onClick={deleteCustomer}>Delete customer</button>
      <br />
      <br />
      <button onClick={getCustomers}>Console List of customers</button>
      <br/>
      <br/>
      <input type="text" name="customerIdSearch" id="customerIdSearch"/> <label htmlFor="customerIdSearch">customerIdSearch to search</label>
      <button onClick = {getCustomer}>Look up customer by Id</button>
      <br/>
      <br/>
      <h3>Generate url</h3>
      <br/>
      <input type="text" name="linkCustomer" id="linkCustomer"/> <label htmlFor="linkCustomer">Customer ID</label>
      <br/>
      <input type="text" name="linkConsumer" id="linkConsumer"/> <label htmlFor="linkConsumer">Consumer ID</label>
      <br/>
      <button onClick = {generateUrl}>generate link</button>
    </div>
  );
}
//test function below will generate an authentication link
//and store it in the current token variable
let currentToken = null;
function createToken() {
  api.authenticate().then(response => {
    console.log(response);
    console.log(response.token);
    alert(response.token);
    currentToken = response.token;
  });
};

//test function will generate a url to connect accounts
function generateUrl() {
  const info = {
    token: currentToken,
    customerId: document.getElementById("linkCustomer").value,
    consumerId: document.getElementById("linkConsumer").value
  }

  api.generateUrl(info)
  .catch(error => {
    console.log(error);
  }).then(response => {
    console.log(response);
    alert("Our generated link: " + response.link);
  });
};

//test function for creating consumers
function createConsumer() {
  const info = {
    token: currentToken,
    customerId: document.getElementById("customerId").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip: document.getElementById("zip").value,
    phone: document.getElementById("phone").value,
    ssn: document.getElementById("ssn").value,
    birthday: {
      year: document.getElementById("birthdayYear").value,
      month: document.getElementById("birthdayMonth").value,
      dayOfMonth: document.getElementById("birthdayDay").value
    },
    email: document.getElementById("email").value
  }

  api.createConsumer(info).then(response => {
    console.log(response);
    alert(`Consumer created for customer id: ${response.customerId}. Created Date: ${response.createdDate}, consumer ID: ${response.id}`);
  }).catch(error => {
    console.log(error);
  });
};

//test function for getting an object that contains an array of all of our listed customers
function getCustomers() {
  const info = {
    token: currentToken
  };

  api.getCustomers(info).catch(error => {
    console.log(error);
  }).then(response => {
    console.log(response);
  });
};

//test function to return a singular customer based on the passed customer ID
function getCustomer() {
  const info = {
    token: currentToken,
    customerId: document.getElementById("customerIdSearch").value
  };

  api.getCustomer(info)
  .then(response => {
    console.log(response);
    alert(`customer found: ${response.id}, username: ${response.username}, createDate: ${response.createdDate}, type: ${response.type}`);
  });
};

//test function that creates a test user using the username box
function createTestUser() {
  const $text = document.getElementById("username").value;
  //alert($text);
  api.createTestUser({
    username: $text,
    token: currentToken
  }).then(response => {
    console.log(response);
    alert(`id: ${response.id}, username: ${response.username}, createDate: ${response.createdDate}`);
  });
};

//test function to delete customer by customer ID
function deleteCustomer() {
  const info = {
    token: currentToken,
    customerId: document.getElementById("deleteCustomerId").value
  }

  api.deleteUser(info).catch(error => {
    console.log(error);
  });
}

//test function to return all accounts associated with a given customer id
function getAccounts() {
  const info = {
    token: currentToken,
    customerId: 1006445022
  }

  api.getAccounts(info).then(response => {
    console.log(response);
    alert("Got a response, consoled");
  })
}

//test function to return a statment for an account ID linked to a customer's ID
function getStatment() {
  //mostly hard coded data for testing purposes
  const info = {
    token: currentToken,
    customerId: 1006445022,
    accountId: 1019548601
  }
  api.getStatement(info).then(response => {
    //TODO
    //somehow save the pdf response here
  });
};

export default App;
