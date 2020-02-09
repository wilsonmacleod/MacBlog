import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './Container/Welcome';
import Content from './Container/Content';
import Admin from './Container/Admin';

const app = () => {
  return ( 
    <div className="App">
      <Route path="/" exact component={Welcome} />
      <Route path="/content" component={Content} />
      <Route path="/adminView" component={Admin} />
  </div>
   );
}
 
export default app;