import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Gallery from './components/Gallery';
import Header from './components/Header';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <Router basename="/frontend_TH_10" forceRefresh={true}>
      <div className="container">
        <Route path='/' component={Header} />
        <Switch>
          <Route exact path="/" render={() => <Gallery keyword='Sunset' />} />
          <Route path="/:keyword" render={({ match }) => <Gallery keyword={match.params.keyword} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
