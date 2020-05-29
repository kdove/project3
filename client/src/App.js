import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./api";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <button onClick = {createToken}>Create new Token</button>
      <br/>
      <input type="text" id="username" /> <button onClick={createTestUser}>Create Test User</button>
    </div>
  );
}
let currentToken = null;
function createToken() {
  api.authenticate().then(response => {
    console.log(response);
    console.log(response.token);
    alert(response.token);
    currentToken = response.token;
  });
};

function createTestUser(){
  const $text = document.getElementById("username").value;
  //alert($text);
  api.createTestUser({
    username: $text,
    token: currentToken
  }).then(response => {
    console.log(response);
    alert(`id: ${response.id}, username: ${response.username}, createDate: ${response.createdDate}`);
  });
}

export default App;
