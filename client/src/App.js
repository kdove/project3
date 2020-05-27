import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./api";
//import { response } from "express";

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
      <button onClick = {click}>Test Button</button>
    </div>
  );
}

function click() {
  api.authenticate().then(response => {
    console.log(response);
    console.log(response.token);
  });
};

export default App;
