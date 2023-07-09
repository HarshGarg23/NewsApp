import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default class App extends Component {
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  apikey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Navbar/>
        
        <Switch>
          <Route exact path="/Home"><News setprogress={this.setprogress} apikey={this.apikey} key="Home" pageSize={30} category="" country="in"/>
          </Route>
          <Route exact path="/business"><News setprogress={this.setprogress} apikey={this.apikey} key="business" pageSize={30} category="business" country="in"/>
          </Route>
          <Route exact path="/general"><News setprogress={this.setprogress} apikey={this.apikey} key="general" pageSize={30} category="general" country="in"/>
          </Route>
          <Route exact path="/entertainment"><News setprogress={this.setprogress} apikey={this.apikey} key="entertainment" pageSize={30} category="entertainment" country="in"/>
          </Route>
          <Route exact path="/sports"><News setprogress={this.setprogress} apikey={this.apikey} key="sports" pageSize={30} category="sports" country="in"/>
          </Route>
          <Route exact path="/sports"><News setprogress={this.setprogress} apikey={this.apikey} key="sports" pageSize={30} category="sports" country="in"/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
