import { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Notice from './components/Notice';
import Customer from './components/Customer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Route exact path="/" component={Home}/>
        <Route exact path="/notice" component={Notice}/>
        <Route exact path="/customer" component={Customer}/>
      </BrowserRouter>
    );
  }
}

export default App; 