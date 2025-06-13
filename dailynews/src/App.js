// entry point for the React application
//  rfc for react function based components to rcc react class component

import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// This is a class component in React.
// It extends the Component class from React and defines a render method.
// The render method returns JSX, which is a syntax extension that allows you to write HTML-like code in JavaScript.

export default class App extends Component {
  c = "This is a class component";
  pageSize = 5;
  render() {
    //render lifecycle methods
    return (
      <div>
        {/* <p>{this.c}</p> 
        <Navbar title="Daily News" />
        <News pageSize={5} country="us" category="science"/>
        */}
        <Router>
          
          <Navbar />
          <Switch>
            <Route exact path="/"><News key="general" pageSize={this.pageSize} country="us" category="general"/></Route> 
            <Route exact path="/business"><News key="business" pageSize={this.pageSize} country="us" category="business"/></Route>
          <Route exact path="/entertainment"><News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/></Route> 
          <Route exact path="/general"><News key="general" pageSize={this.pageSize} country="us" category="general"/></Route> 
          <Route exact path="/health"><News key="health" pageSize={this.pageSize} country="us" category="health"/></Route> 
          <Route exact path="/science"><News key="science" pageSize={this.pageSize} country="us" category="science"/></Route> 
          <Route exact path="/sports"><News key="sports" pageSize={this.pageSize} country="us" category="sports"/></Route> 
          <Route exact path="/technology"><News key="technology" pageSize={this.pageSize} country="us" category="technology"/></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
