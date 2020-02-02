import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './Container/Welcome';
import Content from './Container/Content';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Welcome} />
      <Route path="/content" component={Content} />
    </div>
  );
}

export default App;
