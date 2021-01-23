import { Component } from 'react';
import Customers from './components/Customers';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Customers />
      </div>
    );
  }
}

export default App;