// entry point for the React application
//  rfc for react function based components to rcc react class component 

import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

// This is a class component in React.
// It extends the Component class from React and defines a render method.
// The render method returns JSX, which is a syntax extension that allows you to write HTML-like code in JavaScript.

export default class App extends Component {
  c="This is a class component";
  render() { //render lifecycle methods 
    return (
      <div>
        {/* <p>{this.c}</p> */}
        <Navbar title="Daily News" />
        <News pageSize={5} country="us" category="sports"/>
      </div>
    )
  }
}
