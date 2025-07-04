// entry point for the React application
//  rfc for react function based components to rcc react class component

import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

// This is a class component in React.
// It extends the Component class from React and defines a render method.
// The render method returns JSX, which is a syntax extension that allows you to write HTML-like code in JavaScript.

export default class App extends Component {
  c = 'This is a class component';
  pageSize = 5;
  // apiKey = "54c1aec9ac8d4d60bebd523957581ce6"
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
    mode: 'light',
    searchQuery: ''
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  toggleMode = () => {
    const newMode = this.state.mode === 'light' ? 'dark' : 'light';
    this.setState({ mode: newMode });

    document.body.style.backgroundColor = newMode === 'dark' ? '#121212' : 'white';
    document.body.style.color = newMode === 'dark' ? 'white' : 'black';
  };
  render() {
    //render lifecycle methods
    return (
      <div>
        {/* <p>{this.c}</p> 
        <Navbar title="Daily News" />
        <News pageSize={5} country="us" category="science"/>
        */}
        <Router>
          <Navbar title='Daily News' mode={this.state.mode} toggleMode={this.toggleMode} onSearch={this.handleSearch} />
          <LoadingBar height={3} color='#f11946' progress={this.state.progress} />
          <Switch>
            <Route exact path='/'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='general'
                pageSize={this.pageSize}
                country='us'
                category='general'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/business'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='business'
                pageSize={this.pageSize}
                country='us'
                category='business'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/entertainment'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='entertainment'
                pageSize={this.pageSize}
                country='us'
                category='entertainment'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/general'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='general'
                pageSize={this.pageSize}
                country='us'
                category='general'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/health'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='health'
                pageSize={this.pageSize}
                country='us'
                category='health'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/science'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='science'
                pageSize={this.pageSize}
                country='us'
                category='science'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/sports'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='sports'
                pageSize={this.pageSize}
                country='us'
                category='sports'
                searchQuery={this.state.searchQuery}
              />
            </Route>
            <Route exact path='/technology'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key='technology'
                pageSize={this.pageSize}
                country='us'
                category='technology'
                searchQuery={this.state.searchQuery}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
