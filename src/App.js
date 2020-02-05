import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Welcome from './Container/Welcome';
import Content from './Container/Content';
import Admin from './Container/Admin';

class App extends Component {
  state = {  }

  componentDidMount(){
    const expirationDate = new Date(localStorage.getItem('tokenExpiration'));
    if (expirationDate > new Date()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');
    }
  }

  render() { 
    return ( 
      <div className="App">
        <Route path="/" exact component={Welcome} />
        <Route path="/content" component={Content} />
        <Route path="/adminView" component={Admin} />
    </div>
     );
  }
}
 
export default App;